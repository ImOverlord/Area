import { IForm } from "./IForm";

export interface IApplet {
    getName(): string;
    getDescription(): string;
    getForm(): Array<IForm>;
}

export interface IAppletInfo<T extends object = {}> {
    name: string;
    data: T;
}