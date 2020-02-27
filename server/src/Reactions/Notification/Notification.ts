import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IForm } from '../../Interface/IForm';
import { IReaction } from '../../Interface/IReaction';

@booster({
    serviceName: "Notification",
    name: "Notification",
    type: "reaction"
})
export class NotificationReaction implements IReaction {

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
    public execute(): Promise<void> {
        return Promise.resolve();
    }

}

inject.register("NotificationReaction", NotificationReaction);