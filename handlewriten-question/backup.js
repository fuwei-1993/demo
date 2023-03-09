const template = [
  {
    name: 'Home',
    path: '/',
    component: '../layout',
    routes: [
      {
        name: 'Login',
        component: './login',
        path: '/smartdelivery/login',
      },
      {
        name: 'Home',
        path: '/',
        component: './home'
      },

      {
        name: 'Plan',
        path: '/plan',
        routes: [
          {
            path: '/plan',
            component: './plan/plan'
          },
          {
            name: 'Edit',
            path: 'edit',
            component: './plan/plan/edit'
          },
          {
            name: 'Detail',
            path: 'detail',
            component: './plan/plan/detail'
          },
          {
            name: 'Detail',
            path: 'detail/:id',
            component: './plan/plan/detail'
          },
          {
            name: 'Create',
            path: 'create',
            component: './plan/plan/create'
          }
        ]
      },
      {
        name: 'AdvertisingPlan',
        path: '/advertisingPlan',
        iGrowthName: 'Campaign',
        routes: [
          {
            iGrowthName: 'Campaign',
            path: '/advertisingPlan',
            component: './deliveries',
          },
          {
            iGrowthName: 'Campaign',
            path: '/advertisingPlan/delivery/:id',
            component: './deliveries/detail'
          }]
      },
      {
        name: 'Campaign',
        path: '/campaign',
        routes: [
          {
            path: '/campaign',
            component: './plan/campaign'
          },
          {
            name: 'Edit',
            path: 'edit/:id',
            component: './plan/campaign/edit'
          },
          {
            name: 'Create',
            path: 'create',
            component: './plan/campaign/create'
          },
          {
            name: 'Detail',
            path: 'detail',
            component: './plan/campaign/detail'
          },
          {
            name: 'Detail',
            path: 'detail/:id',
            component: './plan/campaign/detail'
          }
        ]
      },
      {
        name: 'Discount',
        path: '/discount',
        routes: [
          {
            path: '/discount',
            component: './plan/discount'
          },
          {
            name: 'Create',
            path: 'create',
            component: './plan/discount/create'
          },
          {
            name: 'Detail',
            path: 'detail',
            component: './plan/discount/detail'
          },
          {
            name: 'Detail',
            path: 'detail/:id',
            component: './plan/discount/detail'
          }
        ]
      },
      {
        name: 'Crowd',
        path: '/crowd',
        iGrowthName: 'Audiences',
        routes: [
          {
            path: '/crowd',
            component: './crowd'
          },
          {
            path: 'upload',
            component: './crowd'
          },
          {
            name: 'Detail',
            path: 'upload/detail',
            component: './crowd/detail'
          },
          {
            name: 'Detail',
            path: 'upload/detail/:id',
            component: './crowd/detail'
          }, {
            name: 'Audience',
            iGrowthName: 'Audiences',
            path: 'label',
            component: './audience',
          }, {
            iGrowthName: 'Audiences',
            path: 'label/create/:type',
            component: './audience/create',
          },
          {
            iGrowthName: 'Audiences',
            path: 'label/detail/:id',
            component: './audience/detail',
          },
          {
            iGrowthName: 'Audiences',
            path: 'label/copy/:type/:id',
            component: './audience/copy',
          },
        ]
      },
      {
        name: 'Task',
        path: '/task',
        routes: [
          {
            path: '/task',
            component: './plan/task'
          },
          {
            name: 'Create',
            path: 'create',
            component: './plan/task/create'
          },
          {
            name: 'Detail',
            path: 'detail/:id',
            component: './plan/task/detail'
          },
          {
            name: 'Edit',
            path: 'edit/:id',
            component: './plan/task/edit'
          }
        ]
      },
      {
        name: 'Budget',
        path: '/budget',
        routes: [
          {
            path: '/budget',
            component: './budget'
          },
          {
            name: 'Detail',
            path: 'detail',
            component: './budget/detail'
          },
          {
            name: 'Detail',
            path: 'detail/:id',
            component: './budget/detail'
          }
        ]
      },
      {
        name: 'Config',
        path: '/config',
        iGrowthName: 'Setting',
        routes: [
          {
            path: 'application',
            component: './eventConfig'
          },
          {
            iGrowthName: 'Channel Management',
            path: 'channel',
            component: './cdpSetting/channelManagement'
          },
          {
            iGrowthName: 'System Setting',
            path: 'system',
            component: './systemSetting'
          },
          {
            iGrowthName: 'Frequency Cap',
            path: 'frequency',
            component: './setting'
          },
          {
            iGrowthName: 'Label Management',
            path: 'label',
            component: './labelManagement'
          },
        ]
      },
      {
        name: 'meta',
        path: '/meta',
        routes: [
          {
            path: '/meta',
            component: './metaTest'
          }
        ]
      },
      {
        name: 'Advertising',
        path: '/advertising',
        iGrowthName: 'Task',
        routes: [
          {
            path: 'notification',
            component: './advertising',
            iGrowthName: 'Task',
          },
          {
            path: 'task/:action',
            component: './advertising/Edit',
            iGrowthName: 'Task',
          },
          {
            path: 'task/CDP/:taskId',
            component: './advertising/InAppDetail',
            iGrowthName: 'Task',
          },
          {
            path: 'task/SMS/:taskId',
            component: './advertising/Detail',
            iGrowthName: 'Task',
          },
          {
            path: 'task/PUSH/:taskId',
            component: './advertising/Detail',
            iGrowthName: 'Task',
          }
        ]
      },
      {
        iGrowthName: 'Analytics',
        path: '/analytics',
        routes: [
          {
            iGrowthName: 'Overview',
            path: 'overview',
            component: './analytics/overview',
          },
          {
            iGrowthName: 'Campaign',
            path: 'campaign',
            component: './analytics/campaign',
          },
          {
            iGrowthName: 'Channel',
            path: 'channel',
            component: './analytics/channel',
          },
        ],
      },
    ]
  }
]

export const root = ''

const a = new Translate({
  marketingRoutes: routes[0].routes,
  iGrowthRoutes: this.props.auth.menu
}).routes
console.log(a, this.props.auth.menu)


import { flatten } from 'smallfish/util/lodash'

const routeKey = 'iGrowthName'

class Translate {
  constructor({ iGrowthRoutes, marketingRoutes }) {
    this.iGrowthRoutes = iGrowthRoutes
    this.marketingRoutes = marketingRoutes
  }

  get routes () {
    return this.routesTranslateFor(this.marketingRoutes)
  }

  getIGrowthRouteNames(iGrowthRoutes) {
    return flatten(iGrowthRoutes.map(({ name, children }) => {
      if (!children) return name
      return [name, ...this.getIGrowthRouteNames(children)]
    }))
  }

  hasName(name) {
    return this.getIGrowthRouteNames(this.iGrowthRoutes).some((item) => item === name)
  }

  routesTranslateFor(marketingRoutes) {

    return marketingRoutes.filter((item) => {
      if (this.hasName(item[routeKey]) && item.routes) {
        item.routes = this.routesTranslateFor(item.routes)
      }
      return this.hasName(item[routeKey])
    })
  }
}

export default Translate

