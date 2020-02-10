import { inject, loadFiles } from './injector';
import { EveryDayAtAction } from './Actions/EveryDayAt/EveryDayAt';
import { ExpressModule } from './Modules/Express/Express';
import { IAction } from './Interface/IAction';

/** This is the entrypoint */

loadFiles("Actions/");

Promise.all([
    inject.inject(ExpressModule).init()
])
.then(() => {
    loadFiles("Routes/");
    const actions = inject.getByValue<IAction>('type', 'action');
    const promises = [];
    for (const action of actions)
        promises.push(action.init());
    return Promise.all(promises);
})
.then(() => {
    console.log("App Started");
});