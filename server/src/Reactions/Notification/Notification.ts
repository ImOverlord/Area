import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IForm } from '../../Interface/IForm';
import { IReaction } from '../../Interface/IReaction';
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';
import request = require("superagent");
import { INotification, INotificationData } from './INotification';


@booster({
    serviceName: "Notification",
    name: "Notification",
    type: "reaction"
})
export class NotificationReaction implements IReaction {

    private db: firebase.firestore.Firestore;

    constructor(
        firebase: Firebase
    ) {
        this.db = firebase.getApp().firestore();
    }

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Notification";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "Send A Notification";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Array<IForm> {
        return [{
            input: {
                title: 'Title',
                name: 'title',
                regex: undefined
            }
        }, {
            input: {
                title: 'Content',
                name: 'content',
                regex: undefined
            }
        }];
    }

    /**
     * listener
     * @description Action Call Back
     */
    public execute(data: INotificationData, idUser: string): Promise<void> {
        return this.db.collection('/User').where('idUser', '==', idUser)
        .get()
        .then((snapshots) => {
            if (snapshots.empty)
                return Promise.resolve();
            const user = snapshots.docs[0].data().Notification as INotification;
            const requests = [];
            user.expo.forEach((token) => {
                requests.push(
                    new Promise((resolve, reject) => {
                        request.post(`https://exp.host/--/api/v2/push/send`)
                        .set('host', 'exp.host')
                        .set('accept', 'application/json')
                        .set('accept-encoding', 'gzip, deflate')
                        .set('content-type', 'application/json')
                        .send({
                            title: data.title,
                            to: token,
                            body: data.content,
                            sound: "default",
                            channelId: "pushChannel",
                            priority: "high",
                            _displayInForeground: true
                        }).end((err, res) => {
                            if (err) reject(err);
                            else resolve(res);
                        });
                    })
                );
            });
            return Promise.all(requests)
            .then(() => {
                return Promise.resolve();
            });
        });
    }

}

inject.register("NotificationReaction", NotificationReaction);