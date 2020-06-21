"use strict";
function mapObject(target, cb) {
    var result = {};
    for (var key in target) {
        result[key] = cb(target[key]);
    }
    return result;
}
var test = {
    name: 'test',
    func: 'click',
};
mapObject(test, function (val) { return val.length; });
function proxy(target) {
    var result = {};
    var _loop_1 = function (key) {
        result[key] = {
            get: function () {
                return target[key];
            },
            set: function (value) {
                target[key] = value;
            },
        };
    };
    for (var key in target) {
        _loop_1(key);
    }
    return result;
}
function unProxyFy(target) {
    var result = {};
    for (var key in target) {
        result[key] = target[key].get();
    }
    return result;
}
var testProxy = {
    name: 'proxy',
    weight: '150kg',
};
console.log(proxy(testProxy).name.get());
console.log(unProxyFy(proxy(testProxy)));
