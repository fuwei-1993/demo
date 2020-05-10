"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Status;
(function (Status) {
    Status[Status["AWAKE"] = 0] = "AWAKE";
    Status[Status["SLEEP"] = 1] = "SLEEP";
})(Status || (Status = {}));
var methodsDecorator = function () { return function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    console.log(arg);
}; };
var LazyMan = /** @class */ (function () {
    function LazyMan(name) {
        var _this = this;
        this.name = name;
        this.sleepTimes = 0;
        this.sleepUnits = [];
        this.status = Status.AWAKE;
        this.init();
        setTimeout(function () {
            _this.execSleeps();
        });
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
        if (this.status === Status.SLEEP) {
            this.sleepTimes++;
        }
        this.status = Status.SLEEP;
        this.createSleepUnits(function (index) { return (new Promise(function (r) {
            window.setTimeout(function () {
                console.log('sleep....');
                _this.execNextStack(index);
                r();
            }, time);
        })); });
        return this;
    };
    LazyMan.prototype.execSleeps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, _i, _a, sleepUnit;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.sleepTimes === this.sleepUnits.length - 1)) return [3 /*break*/, 4];
                        index = 0;
                        _i = 0, _a = this.sleepUnits;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        sleepUnit = _a[_i];
                        return [4 /*yield*/, sleepUnit.currentFn(index)];
                    case 2:
                        _b.sent();
                        index++;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LazyMan.prototype.eat = function (sth) {
        var handleEat = function () {
            console.log("eating " + sth);
        };
        switch (this.status) {
            case Status.AWAKE:
                handleEat();
                break;
            case Status.SLEEP:
                this.addNextStack(handleEat);
                break;
        }
        return this;
    };
    LazyMan.prototype.addNextStack = function (fn) {
        this.sleepUnits[this.sleepTimes].nextStack.push(fn);
    };
    LazyMan.prototype.execNextStack = function (sleepTimes) {
        this.sleepUnits[sleepTimes].nextStack.forEach(function (fn) { return fn(); });
    };
    LazyMan = __decorate([
        __param(0, methodsDecorator())
    ], LazyMan);
    return LazyMan;
}());
new LazyMan('Tony')
    .eat('breakfast')
    .sleep(1000)
    .eat('lunch')
    .sleep(1000)
    .eat('dinner');
