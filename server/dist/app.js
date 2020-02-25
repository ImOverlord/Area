"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injector_1 = require("./injector");
const Express_1 = require("./Modules/Express/Express");
const Firebase_1 = require("./Modules/Firebase/Firebase");
const Info_1 = require("./Modules/Info/Info");
/** This is the entrypoint */
Promise.all([
    injector_1.inject.inject(Express_1.ExpressModule).init(),
    injector_1.inject.inject(Firebase_1.Firebase).init(),
])
    .then(() => {
    injector_1.loadFiles("Routes/");
    // const actions = inject.getByValue<IAction>('type', 'action');
    const promises = [
        injector_1.inject.inject(Info_1.InfoModule).init()
    ];
    // for (const action of actions)
    //     promises.push(action.init());
    return Promise.all(promises);
})
    .then(() => {
    console.log("App Started");
});
