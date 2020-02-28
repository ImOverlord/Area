import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import { Express, Request, Response } from 'express';
import { ExpressModule } from '../../Modules/Express/Express';
import request = require("superagent");
import { Firebase, firebase } from '../../Modules/Firebase/Firebase';
import { Octokit } from '@octokit/rest';
import { ErrorModule } from '@booster-ts/error-module';
import { RepositoryInfo, IGithubNewIssueData } from './IGithubNewIssue';

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
        firebase: Firebase,
        private error: ErrorModule
    ) {
        this.server = express.getApp();
        this.db = firebase.getApp().firestore();
    }
    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.server.get('/github/oauth/authorize/proxy/expo', (req: Request, res: Response) => {
            res.redirect(`https://auth.expo.io/@tam-epicture/AREA?code=${req.query.code}`);
        });
        this.server.get('/github/oauth/authorize/proxy/firebase', (req: Request, res: Response) => {
            res.redirect(`https://auth.expo.io/@tam-epicture/AREA?code=${req.query.code}`);
        });
        this.server.get('/github/oauth/authorize', (req: Request, res: Response) => {
            request.post('https://github.com/login/oauth/access_token')
            .query({
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_id: 'd98405ce896b0f910209',
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_secret: '6b32a9c27ea2fdbc86c731603dcb5391e89dacd6',
                // eslint-disable-next-line @typescript-eslint/camelcase
                redirect_uri: `https://2ee446c6.ngrok.io/github/oauth/authorize`,
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
        return "Any New Issue";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "This Trigger fires every time any new issue is opened on a repository";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(idUser: string): Promise<Array<IForm>> {
        return this.getToken(idUser)
        .then((token) => {
            const kit = new Octokit({
                auth: `token ${token}`
            });
            return kit.repos.list();
        })
        .then((result) => {
            if (result.status !== 200)
                return Promise.reject(this.error.createError('02', 'Github GetForm', {}, result));
            const repos = result.data as Array<RepositoryInfo>;
            const bareRepos = [];
            for (const repo of repos)
                bareRepos.push(repo.full_name);
            return bareRepos;
        })
        .then((repos) => {
            return [{
                selectionBox: {
                    name: 'repo',
                    title: "Repository",
                    values: repos
                }
            }] as Array<IForm>;
        })
        .catch((error) => {
            return Promise.reject(this.error.createError('02', 'Github GetForm', {}, error));
        });
    }

    private getToken(idUser: string): Promise<string> {
        return this.db.collection('/User').where('idUser', '==', idUser)
        .get()
        .then((snapshots) => {
            if (snapshots.empty)
                return Promise.reject();
            const user = snapshots.docs[0].data().Github;
            if (!user)
                return Promise.reject();
            return user.access_token;
        });
    }

    /**
     * listener
     * @description Action Call Back
     */
    public subscribe(data: IGithubNewIssueData, idUser: string): Promise<void> {
        return this.getToken(idUser)
        .then((token) => {
            const kit = new Octokit({
                auth: `token ${token}`
            });
            const parsedRepo = data.repo.split('/');
            return kit.repos.createHook({
                repo: parsedRepo[1],
                owner: parsedRepo[0],
                name: 'web',
                active: true,
                events: ['push'],
                config: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    content_type: 'json',
                    url: 'https://webhook.site/be4fd2d6-1e4d-49f9-820f-bd9fe964cc34',
                    secret: idUser
                },
            });
        })
        .then(() => {
            return Promise.resolve();
        })
        .catch(() => {
            return Promise.resolve();
        });
    }

    private listener(req: Request, res: Response): void {

    }

}

inject.register("GithubNewIssueAction", GithubNewIssueAction);