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
const Express_1 = require("../../Modules/Express/Express");
const Dispatcher_1 = require("../../Modules/Dispatcher/Dispatcher");
const injector_1 = require("../../injector");
const Firebase_1 = require("../../Modules/Firebase/Firebase");
let AreaRoute = class AreaRoute {
    constructor(express, dispatcher, firebase) {
        this.dispatcher = dispatcher;
        this.firebase = firebase;
        this.app = express.getApp();
        this.app.put('/subscribe', this.subscribe.bind(this));
    }
    subscribe(req, res) {
        const actionName = req.body.actionName;
        const actionData = req.body.actionData;
        const reactionName = req.body.reactionName;
        const reactionData = req.body.reactionData;
        const token = req.headers.authorization;
        const actionInfo = {
            name: actionName,
            data: actionData
        };
        const reactionInfo = {
            name: reactionName,
            data: reactionData
        };
        this.firebase.validateToken(token)
            .then((user) => {
            return this.dispatcher.subscribeArea(user, actionInfo, reactionInfo);
        })
            .then(() => {
            res.status(200).send({
                code: "00",
                text: "Area Was added to account"
            });
        })
            .catch((error) => {
            res.status(error.httpResponse)
                .send({
                code: error.code,
                text: error.why
            });
        });
    }
};
AreaRoute = __decorate([
    core_1.booster(),
    __metadata("design:paramtypes", [Express_1.ExpressModule,
        Dispatcher_1.Dispatcher,
        Firebase_1.Firebase])
], AreaRoute);
exports.AreaRoute = AreaRoute;
injector_1.inject.register("AreaRoute", AreaRoute);
