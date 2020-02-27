import { booster } from '@booster-ts/core';
import { inject } from '../injector';
import { IAction } from '../Interface/IAction';
import { IForm } from '../Interface/IForm';

@booster({
    serviceName: "",
    name: "Notification",
    type: "action"
})
export class NotificationAction implements IAction {

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
        return "Notification Action";
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

inject.register("NotificationAction", NotificationAction);