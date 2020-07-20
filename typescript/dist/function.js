"use strict";
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a, b, c, d) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    }
    else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    };
}
console.log(padding(23));
console.log(padding(23, 11));
function stringOrNumber(foo) {
    if (typeof foo === 'number')
        return foo * foo;
    if (typeof foo === 'string')
        return `hello ${foo}`;
    const err = new Error('使用错误');
    return err;
}
const overLoaded = stringOrNumber;
overLoaded('234');
overLoaded(123);
const simple = foo => foo.toString();
console.log(simple(123));
