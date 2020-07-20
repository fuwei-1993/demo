"use strict";
const user = {
    name: 'Smith',
    gender: 'male',
};
const getUserVale = (user, key) => {
    return user[key];
};
console.log(getUserVale(user, 'name'));
