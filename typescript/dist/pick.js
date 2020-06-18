"use strict";
var testObj = {
    name: 'test',
    age: 18,
    gender: 'female',
};
function pick(obj, keys) {
    var result = {};
    keys.forEach(function (key) {
        result[key] = obj[key];
    });
    return result;
}
var pickObj = pick(testObj, ['age', 'gender']);
