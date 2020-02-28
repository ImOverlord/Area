import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import { Express, Request, Response } from 'express';
import { ExpressModule } from '../../Modules/Express/Express';
import request = require("superagent");
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';

@booster({
    serviceName: "Github",
    name: "GithubNewIssue",
    type: "action"
})
export class GithubNewIssueAction implements IAction {

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
        this.server.get('/github/oauth/authorize', (req: Request, res: Response) => {
            request.post('https://github.com/login/oauth/access_token')
            .query({
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_id: 'd98405ce896b0f910209',
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_secret: '6b32a9c27ea2fdbc86c731603dcb5391e89dacd6',
                // eslint-disable-next-line @typescript-eslint/camelcase
                redirect_uri: req.query.redirect_uri,
                code: req.query.code,
            })
            .end((error, result) => {
                if (error || !result.body.ok)
                    res.status(500).send({
                        code: '99',
                        text: 'Ouath Error',
                        data: result.body
                    });
                else
                    res.send({
                        code: '00',
                        text: "OK",
                        data: result.body
                    });
            });
        });
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Any New Issue";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "This Trigger fires every time any new issue is opened in a repository you own or collaborate on.";
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
    public subscribe(data: unknown, idUser: string): Promise<void> {
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

inject.register("GithubNewIssueAction", GithubNewIssueAction);