"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@booster-ts/core");
const injector_1 = require("../../injector");
const cron = require("node-cron");
const Dispatcher_1 = require("../../Modules/Dispatcher/Dispatcher");
let EveryDayAtAction = class EveryDayAtAction {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    /**
     * init
     * @description Init Action
     */
    init() {
        this.cron = cron.schedule('* * * * *', () => {
            this.dispatcher.dispatchAction('EveryDayAt', { time: `${(new Date).getHours()}:${(new Date()).getMinutes()}` });
            console.log(`Cron ${(new Date).getHours()}:${(new Date()).getMinutes()}`);
        });
        return Promise.resolve();
    }
    /**
     * getName
     * @description Get Action Name
     */
    getName() {
        return "Every Day At";
    }
    /**
     * getDescription
     * @description Action Description
     */
    getDescription() {
        return "This Trigger fires every single day at a specific time set by you.";
    }
    /**
     * getForm
     * @description get Action form
     */
    getForm() {
        return [{
                selectionBox: {
                    title: 'Time',
                    values: [
                        '12am',
                        '1pm'
                    ]
                }
            }];
    }
    /**
     * subscribe
     * @description Subscribe a new user to applets
     */
    subscribe(data) {
        return Promise.resolve();
    }
};
EveryDayAtAction = __decorate([
    core_1.booster({
        serviceName: "Time",
        name: "EveryDayAt",
        type: "action"
    }),
    __metadata("design:paramtypes", [Dispatcher_1.Dispatcher])
], EveryDayAtAction);
exports.EveryDayAtAction = EveryDayAtAction;
injector_1.inject.register("EveryDayAtAction", EveryDayAtAction);
