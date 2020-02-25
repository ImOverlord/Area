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
let InfoModule = class InfoModule {
    constructor(firebase) {
        this.firebase = firebase;
        this.services = [];
        this.db = this.firebase.getApp().firestore();
    }
    /**
     * init
     */
    init() {
        return new Promise((resolve, reject) => {
            this.db.collection('/Services').get()
                .then((snapshot) => {
                snapshot.forEach((service) => {
                    this.services.push(service.get('name'));
                });
                resolve();
            }).catch(reject);
        });
    }
    /**
     * getAbout
     */
    getAbout() {
        const services = [];
        for (const service of this.services) {
            const serviceInformation = {
                name: service,
                actions: [],
                reactions: []
            };
            const containers = injector_1.inject.getContainerByValue('serviceName', service);
            for (const container of containers)
                if (container.data.type === "action" || container.data.type === "reaction")
                    serviceInformation[`${container.data.type}s`].push({
                        name: container.class.getName(),
                        description: container.class.getDescription()
                    });
            services.push(serviceInformation);
        }
        return services;
    }
    /**
     * getActions
     */
    getActions(service) {
        return this.getApplet(service, 'action');
    }
    /**
     * getReactions
     */
    getReactions(service) {
        return this.getApplet(service, 'reaction');
    }
    getApplet(service, type) {
        const containers = injector_1.inject.getContainerByValue('serviceName', service);
        const applets = [];
        for (const container of containers) {
            if (container.data.type !== type)
                continue;
            applets.push({
                name: container.class.getName(),
                description: container.class.getDescription(),
                form: container.class.getForm()
            });
        }
        return applets;
    }
};
InfoModule = __decorate([
    core_1.booster(),
    __metadata("design:paramtypes", [Firebase_1.Firebase])
], InfoModule);
exports.InfoModule = InfoModule;
