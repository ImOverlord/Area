import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IForm } from '../../Interface/IForm';
import { ExpressModule } from '../../Modules/Express/Express';
import { Express, Request, Response } from 'express';
import request = require("superagent");
import { IReaction } from '../../Interface/IReaction';
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';
import { ISendSlackMessage, ISlackInfo } from './ISendSlackMessage';

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
        this.server.get('/slack/oauth/authorize/proxy/expo', (req: Request, res: Response) => {
            res.redirect(`https://auth.expo.io/@tam-epicture/AREA?code=${req.query.code}`);
        });
        this.server.get('/github/oauth/authorize/proxy/firebase', (req: Request, res: Response) => {
            res.redirect(`https://auth.expo.io/@tam-epicture/AREA?code=${req.query.code}`);
        });
        this.server.get('/slack/oauth/authorize', this.convert.bind(this));
        return Promise.resolve();
    }

    private convert(req: Request, res: Response): void {
        request.get('https://slack.com/api/oauth.v2.access').query({
            // eslint-disable-next-line @typescript-eslint/camelcase
            client_id: '645826239602.957881164305',
            // eslint-disable-next-line @typescript-eslint/camelcase
            client_secret: 'ea08a655351fdb6c4b926d29667329b9',
            // eslint-disable-next-line @typescript-eslint/camelcase
            redirect_uri: `https://area.cap.famille4.com/slack/oauth/authorize/proxy/expo`,
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
                    text: "OK",
                    data: result.body
                });
            }
        });
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
    public getForm(): Promise<Array<IForm>> {
        return Promise.resolve([{
            input: {
                name: 'content',
                regex: null,
                title: 'Message'
            }
        }]);
    }

    /**
     * listener
     * @description Action Call Back
     */
    public execute(data: ISendSlackMessage, idUser: string): Promise<void> {
        return this.db.collection('/User').where('idUser', '==', idUser)
        .get()
        .then((snapshots) => {
            if (snapshots.empty)
                return Promise.resolve();
            const user = snapshots.docs[0].data() as ISlackInfo;
            return request.post(`https://slack.com/api/chat.postMessage`)
            .set('Authorization', `Bearer ${user.access_token}`)
            .send({
                channel: user.authed_user.id,
                text: data.content || "Area2020"
            })
            .then(() => {
                return Promise.resolve();
            });
        });
    }

}

inject.register("SendSlackMessageReaction", SendSlackMessageReaction);
