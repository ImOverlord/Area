import { IForm } from "./IForm";

export interface IApplet {
    getName(): string;
    getDescription(): string;
    getForm(idUser: string): Promise<Array<IForm>>;
}

export interface IAppletInfo<T extends object = {}> {
    name: string;
    data: T;
}