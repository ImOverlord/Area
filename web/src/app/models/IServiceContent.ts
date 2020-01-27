import { IService } from './IService';
import { IApp } from './IApp';

export interface IServiceContent extends IService {
    desc: string;
    apps: IApp[];
}
