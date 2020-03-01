import { booster } from '@booster-ts/core';
import { Firebase, firebase } from '../Firebase/Firebase';
import { ErrorModule } from '@booster-ts/error-module';
import { IError } from '../../Interface/IError';

@booster()
export class Monitor {

    private db: firebase.firestore.Firestore;

    constructor(
        private firebase: Firebase,
        private error: ErrorModule
    ) {
        this.db = this.firebase.getApp().firestore();
    }

    public init(): Promise<void> {
        this.error.use(this.reportError.bind(this));
        return Promise.resolve();
    }

    private reportError(error: IError): void {
        error['time'] = Date.now();
        this.db.collection('Error').add(error).catch(console.log);
    }

}