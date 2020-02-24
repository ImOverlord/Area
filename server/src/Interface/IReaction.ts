import { IApplet } from './IApplet';

export interface IReaction extends IApplet {
    init(): Promise<void>;
    execute(reactionInfo: unknown): Promise<void>;
}