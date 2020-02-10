import { booster } from '@booster-ts/core';
import { Request, Response, Express } from 'express';
import { ExpressModule } from '../../Modules/Express/Express';
import { Dispatcher } from '../../Modules/Dispatcher/Dispatcher';
import { inject } from '../../injector';

@booster()
export class AreaRoute {

    private app: Express;

    constructor(
        express: ExpressModule,
        private dispatcher: Dispatcher
    ) {
        this.app = express.getApp();
        this.app.post('/subscribe', this.subscribe.bind(this));
    }

    private subscribe(req: Request, res: Response) {
        const actionName = req.body.actionName;
        const actionData = req.body.actionData;
        const reactionName = req.body.reactionName;
        const token = req.headers.authorization;

        this.dispatcher.subscribeAction(null, actionName, actionData)
        .then(() => {
            res.status(200).send();
        })
        .catch((error) => {
            res.status(404).send();
        });
    }

}

inject.register("AreaRoute", AreaRoute);