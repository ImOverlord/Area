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
const Firebase_1 = require("../Firebase/Firebase");
const error_module_1 = require("@booster-ts/error-module");
let Dispatcher = class Dispatcher {
    constructor(firebase, error) {
        this.firebase = firebase;
        this.error = error;
        console.log("Called");
        console.log(console.trace());
        // this.db = this.firebase.getApp().firestore();
    }
    /**
     * dispatchAction
     * @description Calls Correct Reaction for Action
     */
    dispatchAction(name, data) {
        const filter = {
            name,
            data
        };
        console.log(`Dispatcher Called`);
        this.db.collection('/Area').where('action', '==', filter)
            .get().then((results) => {
            console.log(results);
        })
            .catch((error) => {
            console.error(error);
        });
        return Promise.reject();
    }
    /**
     * subscribeAction
     * @description Subscribe a user to a new Action
     */
    subscribeArea(user, actionInfo, reactionInfo) {
        const action = injector_1.inject.getByValue('name', actionInfo.name)[0];
        const info = {
            idUser: user.uid,
            user: user.email,
            action: actionInfo,
            reaction: reactionInfo,
            dateAdded: Date.now()
        };
        return this.db.collection('/Area').add(info)
            .then(() => {
            return action.subscribe(actionInfo.data);
        })
            .catch((error) => {
            return Promise.reject(this.error.createError("99", "subscribeArea", {}, error));
        });
    }
};
Dispatcher = __decorate([
    core_1.booster(),
    __metadata("design:paramtypes", [Firebase_1.Firebase,
        error_module_1.ErrorModule])
], Dispatcher);
exports.Dispatcher = Dispatcher;
