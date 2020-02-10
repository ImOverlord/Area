import { booster } from '@booster-ts/core';
import { inject } from '<%= source %>/injector';
import { IAction } from '<%= source %>/Interface/IAction';
import { IForm } from '<%= source %>/Interface/IForm';
import { Request, Response, request } from 'express';

@booster({
    serviceName: "",
    name: "<%= name %>",
    type: "action"
})
export class <%= name %>Action implements IAction {

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
    public getName() {
        return "<%= name %>";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription() {
        return "<%= name %> Action";
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
    public listener(req: Request, res: Response): Promise<any> {
        return Promise.resolve();
    }

}

inject.register("<%= name %>Action", <%= name %>Action);