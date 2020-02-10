import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';

@booster()
export class Dispatcher {

    constructor() { }

    /**
     * dispatchAction
     * @description Calls Correct Reaction for Action
     */
    public dispatchAction(name: string, data: any) {
        
    }

    /**
     * subscribeAction
     * @description Subscribe a user to a new Action
     */
    public subscribeAction(user, actionName: string, data: any): Promise<void> {
        const action = inject.getByValue<IAction>('name', actionName)[0];

        /** @todo Add to Database  */
        if (action)
            return action.subscribe(data);
        return Promise.reject();
    }

}