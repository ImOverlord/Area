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

    private db: firebase.database.Database;

    constructor(
        private firebase: Firebase,
        private error: ErrorModule
    ) {
        this.db = this.firebase.getApp().database()
    }

    /**
     * dispatchAction
     * @description Calls Correct Reaction for Action
     */
    public dispatchAction(name: string, data: any): Promise<void> {
        return Promise.reject();
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
            time: Date.now()
        };

        return new Promise((resolve, reject) => {
            this.db.ref('/area/').push(info, (error) => {
                if (error) {
                    reject(this.error.createError("99", "subscribeArea", {}, error));
                } else {
                    action.subscribe(actionInfo.data)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(this.error.createError("99", `subscribe${actionInfo.name}`, {}, error));
                    });
                }
            });
        });
    }

}