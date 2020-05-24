"use strict";
var user = {
    name: 'Smith',
    gender: 'male',
};
var getUserVale = function (user, key) {
    return user[key];
};
console.log(getUserVale(user, 'name'));
