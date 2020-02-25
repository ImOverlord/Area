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
const injector_1 = require("../../injector");
const Info_1 = require("../../Modules/Info/Info");
let InfoRoute = class InfoRoute {
    constructor(express, info) {
        this.info = info;
        this.app = express.getApp();
        this.app.get('/actions/:name', this.getActions.bind(this));
        this.app.get('/reactions/:name', this.getReactions.bind(this));
        this.app.get('/about.json', this.getAbout.bind(this));
    }
    getAbout(req, res) {
        const services = this.info.getAbout();
        const result = {
            client: {
                host: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            },
            server: {
                /** Prevent ESLint Error */
                "current_time": parseInt((Date.now() / 1000).toFixed(0)),
                services
            }
        };
        res.status(200).send(result);
    }
    getActions(req, res) {
        const serviceName = req.params.name;
        const actions = this.info.getActions(serviceName);
        res.status(200).send({
            code: "00",
            text: `Actions for ${serviceName} Service`,
            data: {
                actions
            }
        });
    }
    getReactions(req, res) {
        const serviceName = req.params.name;
        const reactions = this.info.getReactions(serviceName);
        res.status(200).send({
            code: "00",
            text: `Reactions for ${serviceName} Service`,
            data: {
                reactions
            }
        });
    }
};
InfoRoute = __decorate([
    core_1.booster(),
    __metadata("design:paramtypes", [Express_1.ExpressModule,
        Info_1.InfoModule])
], InfoRoute);
exports.InfoRoute = InfoRoute;
injector_1.inject.register("InfoRoute", InfoRoute);
