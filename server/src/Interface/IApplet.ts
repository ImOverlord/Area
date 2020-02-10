import { IForm } from "./IForm";

export interface IApplet {
    getName(): string;
    getDescription(): string;
    getForm(): Array<IForm>;
}