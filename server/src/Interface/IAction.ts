import { IApplet } from "./IApplet";
import { Request, Response} from 'express';

export interface IAction extends IApplet {
    init(): Promise<void>;
    subscribe(data: any): Promise<void>;
}