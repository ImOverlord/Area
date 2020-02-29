import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IForm } from '../../Interface/IForm';
import { IReaction } from '../../Interface/IReaction';
import { Client } from 'asana';
import request = require('superagent');
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';
import { ExpressModule } from '../../Modules/Express/Express';
import { Express, Request, Response } from 'express';

@booster({
    serviceName: "Asana",
    name: "AsanaCreateTask",
    type: "reaction"
})
export class AsanaCreateTaskReaction implements IReaction {

    private server: Express;
    private db: firebase.firestore.Firestore;

    constructor(
        firebase: Firebase,
        express: ExpressModule
    ) {
        this.server = express.getApp();
        this.db = firebase.getApp().firestore();
    }
    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.server.get('/asana/oauth/authorize/proxy/expo', (req: Request, res: Response) => {
            res.redirect(`https://auth.expo.io/@tam-epicture/AREA?code=${req.query.code}`);
        });
        this.server.get('/asana/oauth/authorize', (req: Request, res: Response) => {
            request.post('https://github.com/login/oauth/access_token')
            .query({
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_id: '1164254333734113',
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_secret: 'b2925aecc203adebd8a5bd32a98c35c2',
                // eslint-disable-next-line @typescript-eslint/camelcase
                redirect_uri: `https://area.cap.famille4.com/asana/oauth/authorize`,
                code: req.query.code
            })
            .end((error, result) => {
                if (error)
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
        return "AsanaCreateTask";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "AsanaCreateTask Action";
    }

    /**
     * getForm
     * @description get Action form
     */
    public async getForm(): Promise<Array<IForm>> {
        const client = Client.create().useAccessToken('0/d9acb933b0cdf110ef01b78e63d30c04');
        const user = (await client.users.me());

        return [{selectionBox: {
            title: 'Workspace',
            name: 'workspace',
            values: user.workspaces.map((value) => value.name)
        }}];
    }

    /**
     * listener
     * @description Action Call Back
     */
    public execute(data: unknown, idUser: string): Promise<void> {
        return Promise.resolve();
    }

    private getToken(idUser: string): Promise<string> {
        return this.db.collection('/User').where('idUser', '==', idUser)
        .get()
        .then((snapshots) => {
            if (snapshots.empty)
                return Promise.reject();
            const user = snapshots.docs[0].data().Asana;
            if (!user)
                return Promise.reject();
            return user.access_token;
        });
    }

}

inject.register("AsanaCreateTaskReaction", AsanaCreateTaskReaction);