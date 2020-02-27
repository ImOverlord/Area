import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IForm } from '../../Interface/IForm';
import { ExpressModule } from '../../Modules/Express/Express';
import { Express, Request, Response } from 'express';
import request = require("superagent");
import { IReaction } from '../../Interface/IReaction';
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';

@booster({
    serviceName: "Slack",
    name: "SendSlackMessage",
    type: "reaction"
})
export class SendSlackMessageReaction implements IReaction {

    private server: Express;
    private db: firebase.firestore.Firestore;

    constructor(
        express: ExpressModule,
        firebase: Firebase
    ) {
        this.server = express.getApp();
        this.db = firebase.getApp().firestore();
    }

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.server.get('/slack/oauth/authorize', (req: Request, res: Response) => {
            request.get('https://slack.com/api/oauth.v2.access').query({
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_id: '645826239602.957881164305',
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_secret: 'ea08a655351fdb6c4b926d29667329b9',
                // eslint-disable-next-line @typescript-eslint/camelcase
                redirect_uri: `https://area.cap.famille4.com/slack/oauth/authorize`,
                code: req.query.code
            })
            .end((error, result) => {
                if (error || result.body.ok === false) {
                    res.status(500).send({
                        code: '99',
                        text: 'SLACK Error',
                        data: result.body
                    });
                } else {
                    res.send({
                        code: "00",
                        text: 'OK',
                        data: result.body
                    });
                }
            });
        });
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Send Slack Message";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "This Reaction will send direct message to you.";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Array<IForm> {
        return [{
            input: {
                name: 'content',
                regex: null,
                title: 'Message'
            }
        }];
    }

    /**
     * listener
     * @description Action Call Back
     */
    public execute(data: unknown, idUser: string): Promise<void> {
        return this.db.collection('/User').where('idUser', '==', idUser)
        .get()
        .then((snapshots) => {
            if (snapshots.empty)
                return Promise.resolve();
            const user = snapshots.docs[0].data();
            console.log(user);
            return Promise.resolve();
        });
    }

}

inject.register("SendSlackMessageReaction", SendSlackMessageReaction);
