"use strict";
var Status;
(function (Status) {
    Status[Status["AWAKE"] = 0] = "AWAKE";
    Status[Status["SLEEP"] = 1] = "SLEEP";
})(Status || (Status = {}));
var LazyMan = /** @class */ (function () {
    function LazyMan(name) {
        this.name = name;
        this.sleepTimes = 0;
        this.sleepUnits = [];
        this.status = Status.AWAKE;
        this.init();
    }
    LazyMan.prototype.init = function () {
        console.log("Hey I am " + this.name);
    };
    LazyMan.prototype.createSleepUnits = function (currentFn) {
        this.sleepUnits[this.sleepTimes] = {
            currentFn: currentFn,
            nextStack: []
        };
    };
    LazyMan.prototype.sleep = function (time) {
        var _this = this;
        this.status = Status.SLEEP;
        this.createSleepUnits(function () {
            setTimeout(function () {
                console.log('sleep....');
                _this.execNextStack();
            }, time);
        });
        this.sleepTimes++;
        return this;
    };
    LazyMan.prototype.execSleeps = function () {
    };
    LazyMan.prototype.eat = function (sth) {
        var handleEat = function () {
            console.log("eating " + sth);
        };
        switch (this.status) {
            case Status.AWAKE:
                handleEat();
            case Status.SLEEP:
                this.addNextStack(handleEat);
                break;
        }
        return this;
    };
    LazyMan.prototype.addNextStack = function (fn) {
        this.sleepUnits[this.sleepTimes].nextStack.push(fn);
    };
    LazyMan.prototype.execNextStack = function () {
        this.sleepUnits[this.sleepTimes].nextStack.forEach(function (fn) { return fn(); });
    };
    return LazyMan;
}());
new LazyMan('Tony')
    .eat('breakfast')
    .sleep(1000)
    .eat('lunch')
    .sleep(1000)
    .eat('dinner');
