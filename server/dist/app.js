"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injector_1 = require("./injector");
const Express_1 = require("./Modules/Express/Express");
/** This is the entrypoint */
injector_1.loadFiles("Actions/");
Promise.all([
    injector_1.inject.inject(Express_1.ExpressModule).init()
])
    .then(() => {
    injector_1.loadFiles("Routes/");
    const actions = injector_1.inject.getByValue('type', 'action');
    const promises = [];
    for (const action of actions)
        promises.push(action.init());
    return Promise.all(promises);
})
    .then(() => {
    console.log("App Started");
});
