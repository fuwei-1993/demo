"use strict";
function mapObject(target, cb) {
    const result = {};
    for (const key in target) {
        result[key] = cb(target[key]);
    }
    return result;
}
const test = {
    name: 'test',
    func: 'click',
};
mapObject(test, (val) => val.length);
function proxy(target) {
    const result = {};
    for (const key in target) {
        result[key] = {
            get() {
                return target[key];
            },
            set(value) {
                target[key] = value;
            },
        };
    }
    return result;
}
function unProxyFy(target) {
    const result = {};
    for (const key in target) {
        result[key] = target[key].get();
    }
    return result;
}
const testProxy = {
    name: 'proxy',
    weight: '150kg',
};
console.log(proxy(testProxy).name.get());
console.log(unProxyFy(proxy(testProxy)));
