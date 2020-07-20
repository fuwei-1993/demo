"use strict";
const testObj = {
    name: 'test',
    age: 18,
    gender: 'female',
};
function pick(obj, keys) {
    const result = {};
    keys.forEach((key) => {
        result[key] = obj[key];
    });
    return result;
}
const pickObj = pick(testObj, ['age', 'gender']);
