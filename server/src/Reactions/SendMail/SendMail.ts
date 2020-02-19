import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IReaction } from '../../Interface/IReaction';
import { IForm } from '../../Interface/IForm';
import { ISendMail } from './ISendMail';

@booster({
    serviceName: "",
    name: "SendMail",
    type: "action"
})
export class SendMailAction implements IReaction {

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
        return "SendMail";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "SendMail Action";
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
    public execute(reactionInfo: ISendMail): Promise<void> {
        console.log(reactionInfo);
        return Promise.resolve();
    }

}

inject.register("SendMailAction", SendMailAction);