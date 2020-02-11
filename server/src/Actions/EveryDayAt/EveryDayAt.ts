import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import cron = require("node-cron");

@booster({
    serviceName: "Time",
    name: "EveryDayAt",
    type: "action"
})
export class EveryDayAtAction implements IAction {

    private cron: cron.ScheduledTask;

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.cron = cron.schedule('* * * * *', () => {
            console.log(`Cron ${(new Date).getHours()}:${(new Date()).getMinutes()}`);
        });
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Every Day At";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "This Trigger fires every single day at a specific time set by you.";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Array<IForm> {
        return [{
            selectionBox: {
                title: 'Time',
                values: [
                    '12am',
                    '1pm'
                ]
            }
        }];
    }

    /**
     * subscribe
     * @description Subscribe a new user to applets
     */
    public subscribe(data: any): Promise<void> {
        return Promise.resolve();
    }

}

inject.register("EveryDayAtAction", EveryDayAtAction);