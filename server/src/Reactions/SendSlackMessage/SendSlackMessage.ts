import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import { ExpressModule } from '../../Modules/Express/Express';
import { Express, Request, Response } from 'express';
import request = require("superagent");

@booster({
    serviceName: "",
    name: "SendSlackMessage",
    type: "action"
})
export class SendSlackMessageAction implements IAction {

    private server: Express;

    constructor(
        express: ExpressModule
    ) {
        this.server = express.getApp();
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
                redirect_uri: `${process.env.BASE_URL}/slack/oauth/authorize`,
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
                        text: 'OK'
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
        return "SendSlackMessage";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "SendSlackMessage Action";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Array<IForm> {
        return [];
    }

    /**
     * listener
     * @description Action Call Back
     */
    public subscribe(data: unknown): Promise<void> {
        return Promise.resolve();
    }

}

inject.register("SendSlackMessageAction", SendSlackMessageAction);