"use strict";
var LazyManClass = /** @class */ (function () {
    function LazyManClass(name) {
        var _this = this;
        this.queue = [];
        this.name = name;
        console.log("Hi I am " + name);
        setTimeout(function () {
            _this.next();
        });
    }
    LazyManClass.prototype.next = function () {
        var current = this.queue.shift();
        current && current();
    };
    LazyManClass.prototype.exec = function (time) {
        var _this = this;
        setTimeout(function () {
            console.log("Waiting " + time + " s ...");
            _this.next();
        }, time);
    };
    LazyManClass.prototype.sleep = function (time) {
        var _this = this;
        this.queue.push(function () {
            _this.exec(time);
        });
        return this;
    };
    LazyManClass.prototype.eat = function (sth) {
        var _this = this;
        this.queue.push(function () {
            console.log("I am eating " + sth);
            _this.next();
        });
        return this;
    };
    LazyManClass.prototype.sleepFirst = function (time) {
        var _this = this;
        this.queue.unshift(function () {
            _this.exec(time);
        });
        return this;
    };
    return LazyManClass;
}());
function createLazyMan(lazy, name) {
    return new lazy(name);
}
var lazyMan = createLazyMan.bind(null, LazyManClass);
var lunchLazyMan = createLazyMan.bind(null, LazyManClass);
var dinerLazyMan = createLazyMan.bind(null, LazyManClass);
lazyMan('Tony');
// Hi I am Tony
lazyMan('Smith').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了 10 秒...
// I am eating
lunchLazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch// 等待了 10 秒...
// I am eating
dinerLazyMan('Tony')
    .eat('lunch')
    .eat('dinner')
    .sleepFirst(5)
    .sleep(10)
    .eat('junk food');
// Hi I am Tony// 等待了 5 秒...
// I am eating lunch
// I am eating dinner
// 等待了 10 秒...
// I am eating junk food
