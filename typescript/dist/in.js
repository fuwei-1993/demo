"use strict";
const idCard = Symbol('identify');
const collection = {
    names: 'Smith',
    [idCard]: 'fuwei'
};
const customObj = {
    [0]: '123'
};
const spread = (a, b) => {
    return { ...a, ...b };
};
