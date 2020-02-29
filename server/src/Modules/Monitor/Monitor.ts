import { booster } from '@booster-ts/core';
import { Firebase, firebase } from '../Firebase/Firebase';
import { ErrorModule } from '@booster-ts/error-module';

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
        return Promise.resolve();
    }

}