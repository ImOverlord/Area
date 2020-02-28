import { IApplet } from "./IApplet";

export interface IAction extends IApplet {
    init(): Promise<void>;
    subscribe(data: unknown, idUser: string): Promise<void>;
}