import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { Firebase } from '../Firebase/Firebase';
import firebase = require("firebase-admin");
import { IAppletInfo } from '../../Interface/IApplet';
import { IArea } from '../../Interface/IArea';
import { ErrorModule } from '@booster-ts/error-module';

@booster()
export class Dispatcher {

    private db: firebase.firestore.Firestore;

    constructor(
        private firebase: Firebase,
        private error: ErrorModule
    ) {
        this.db = this.firebase.getApp().firestore();
    }

    /**
     * dispatchAction
     * @description Calls Correct Reaction for Action
     */
    public dispatchAction(name: string, data: any): Promise<void> {
        const filter: IAppletInfo = {
            name,
            data
        };
        console.log(`Dispatcher Called`);
        this.db.collection('/Area').where('action', '==', filter);
        return Promise.resolve();
    }

    /**
     * subscribeAction
     * @description Subscribe a user to a new Action
     */
    public subscribeArea<A extends object = {}, R extends object = {}>(user: firebase.auth.UserRecord, actionInfo: IAppletInfo<A>, reactionInfo: IAppletInfo<R>): Promise<void> {
        const action = inject.getByValue<IAction>('name', actionInfo.name)[0];
        const info: IArea = {
            idUser: user.uid,
            user: user.email,
            action: actionInfo,
            reaction: reactionInfo,
            dateAdded: Date.now()
        };

        if (!action)
            return Promise.reject(this.error.createError("04", "subscribeArea", {why: "Action does not exist"}));
        return this.db.collection('/Area').add(info)
        .then(() => {
            return action.subscribe(actionInfo.data);
        })
        .catch((error) => {
            return Promise.reject(this.error.createError("99", "subscribeArea", {}, error));
        });
    }

}