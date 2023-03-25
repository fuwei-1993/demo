require('v8-compile-cache');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const DynamicPublicPathPlugin = require('./dynamic-publicpath-plugin');
const StaticMapCreate = require('./static-map-create-plugin');
const OfflineCachePlugin = require('./offline-cache-plugin');
const GenFatFilesPlugin = require('./gen-fat-files-plugin');
const BuildMainPlugin = require('./build-main-plugin');
const { asyncVendors } = require('./dynamic-vendors/utils');
// 构建平台需安装环境 暂不支持 https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker
// const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

const {
  name,
  isMobile,
  resolve,
  plugins,
  externals,
  getWebpackOverridesConfig,
  isSpecialApp,
  assetsPath,
  buildTag,
  isProduction,
} = require('./utils');
const { resolveApp, resolveSeeyonSyf } = require('./resolve');
const { copyEntry, generateBuildTime } = require('./copy-entry');

const enableCache = process.env.ENABLE_CACHE;
const buildType = process.env.BUILD_TYPE;

if (!isSpecialApp) {
  copyEntry();
}

generateBuildTime();

plugins.push(
  new CleanWebpackPlugin(),
  // new LodashModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash:8].css',
    chunkFilename: '[name].[chunkhash:8].chunk.css',
    ignoreOrder: true,
  }),
  new WebpackManifestPlugin({
    generate: (seed, files) => {
      const res = { appId: name };
      files.forEach((file) => {
        // 以index的hash作为判断整个dist离线包是否需要重新下载的flag
        // 生成manifest.json
        if (file.name === 'index.js') {
          if (file.chunk && file.chunk.hash) {
            res.hash = file.chunk.hash;
          }
        }
      });

      return res;
    },
  }),
  new FileManagerPlugin({
    events: {
      onEnd: {
        copy: [
          {
            source: './version.json',
            destination: './dist/version.json',
          },
          {
            source: './src/i18n',
            destination: './dist/i18n',
          },
        ],
        delete: ['./version.json'],
      },
    },
  }),
);

if (enableCache === 'enableCache') {
  plugins.push(new OfflineCachePlugin());
}

if (buildType === 'zip') {
  //
} else {
  // 非离线应用包启用
  plugins.push(new DynamicPublicPathPlugin({ buildTag }));
}
// 移动端应用添加static source map供sw调用
if (isMobile) {
  plugins.push(new StaticMapCreate());
}

// 分析依赖包
if (process.env.ANALYSE === 'true') {
  plugins.push(new BundleAnalyzerPlugin());
}

// 打包后，记录大文件在一个json中，供预加载
plugins.push(new GenFatFilesPlugin());

// 构建主应用或特殊应用时需要单独一些逻辑
if (['main', 'main-mobile'].includes(name) || isSpecialApp) {
  plugins.push(new BuildMainPlugin({ app: name }));
}

let buildConfig = {
  target: ['web', 'es5'],
  mode: 'production',
  entry: {
    index: [resolveApp('src/entry.tsx')],
  },
  output: {
    path: resolveApp(buildType === 'zip' ? 'dist/hashDist/www' : 'dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    // 打包离线包时，相对地
    publicPath: buildType === 'zip' ? './' : `${assetsPath}/${name}/`,
  },
  resolve,
  externals: [
    function ({ request }, cb) {
      if (externals[request]) {
        if (isMobile && asyncVendors[request]) {
          return cb(null, [externals[request]], 'promise');
        } else {
          return cb(null, [externals[request]]);
        }
      }
      cb();
    },
  ],
  plugins,
  devServer: {}, //兼容development模式构建时，本地override中的devServer配置
  performance: {
    // false，'warning', 'error'
    hints: 'warning',
    // 限制为500kb
    maxAssetSize: 500000,
    // 入口文件限制
    maxEntrypointSize: 500000,
    // 只提示js文件
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
  stats: {
    colors: true,
    children: false,
    assetsSort: '!size',
    // 添加缓存（但未构建）模块的信息
    cached: true,
    // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
    cachedAssets: true,
    modules: true,
    // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
    moduleTrace: true,
    performance: true,
  },
  optimization: {
    chunkIds: 'named',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // test: /\.js(\?.*)?$/i,
        // parallel: os.cpus().length - 1,
        exclude: /\.map$/,
        minify: TerserPlugin.swcMinify,
        // include: /\/includes/,
        // minify: TerserPlugin.esbuildMinify,
        // 下面的配置取决于 minify的值，因此下面使用`` options
        //extractComments: false,
        terserOptions: {
          ecma: 5,
          compress: {
            // 标记 alert 为无副作用
            pure_funcs: ['alert'],
            drop_console: isProduction,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      enforceSizeThreshold: 100000,
      minChunks: 2,
      // 注：打包业务代码，合成新chunk时，如果包含 立即执行文件（chunks："all"），portal 模块联邦会报错
      cacheGroups: {
        'app-styles': {
          name: 'app-styles',
          test: (module) => module.constructor.name === 'CssModule',
          chunks: 'all',
          priority: 10,
          enforce: true,
          reuseExistingChunk: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          chunks: 'all',
          minChunks: 3,
          priority: -10,
          reuseExistingChunk: true,
          usedExports: true,
        },
        bussinessNormal: {
          test(module) {
            // 排除模块联邦中share的模块
            return module.resource && module.resource.indexOf('@seeyon/biz-content') === -1;
          },
          name: 'bussiness',
          chunks: 'async',
          minChunks: 3,
          priority: -20,
        },
        default: {
          priority: -100,
          reuseExistingChunk: true,
          usedExports: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [/(src)/, /(node_modules(\/|\\)@seeyon)/],
        // include: /(src)/,
        // exclude: /(node_modules)/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              // cacheDirectory: false,
              "jsc": {
                "parser": {
                    "syntax": "typescript",
                    "tsx": true,
                },

            },
            "isModule": true,
            "shippedProposals": true,
              "env": {
                  "targets": "Chrome >= 65",
                  "coreJs": '3.26.1'
              }
            },
          },
        ],
      }, {
        test: /\.(js|jsx)$/,
        include: [/(src)/, /(node_modules(\/|\\)@seeyon)/],
        // include: /(src)/,
        // exclude: /(node_modules)/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              // cacheDirectory: false,
              "jsc": {
                "parser": {
                    "syntax": "ecmascript",
                    "jsx": true,
                },
            },
            "isModule": true,
            "shippedProposals": true,
              "env": {
                  "targets": "Chrome >= 65",
                  "coreJs": '3.26.1'
              }
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        // include: /(src)/,
        // exclude: /(node_modules)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              url: (url) => {
                if (url.startsWith('/')) {
                  return false;
                }
                return true;
              },
              modules: {
                auto: true,
                exportLocalsConvention: 'camelCase',
                localIdentName: isMobile ? 'm-[hash:8]' : '[hash:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: resolveSeeyonSyf('scripts/postcss.js'),
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: /(src)/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
              titleProp: 'title',
              // ...babelConfigOptions
            },
          },
        ],
      },

      {
        test: /\.(jpg|jpeg|gif|png|eot|ttf|woff|woff2)$/,
        include: /(src)/,
        exclude: /(node_modules)/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
  // cache: {
  //   type: 'filesystem',
  //   // 额外的依赖文件，当这些文件内容发生变化时，缓存会完全失效而执行完整的编译构建，通常可设置为项目配置文件
  //   buildDependencies: {
  //     defaultWebpack: ['webpack/lib/', '@seeyon/syf/scripts/'],
  //     config: [__filename],
  //   },
  // },
};

const webpackOverride = getWebpackOverridesConfig();

if (typeof webpackOverride === 'function') {
  let resConfig = webpackOverride(
    buildConfig,
    process.env.SERVE_MODE === 'LOCAL' ? 'development' : 'production',
  );
  if (typeof resConfig === 'object') buildConfig = resConfig;
}

module.exports = buildConfig;
