# ExpressModule

An Express Wrapper for booster-ts.

## Getting Started

### Installation

```sh
$ npm i @booster-ts/express-module @types/express
```

### Setting Up

In you project package.json you will need to add the field **express-module** in the field **booster**
```json
"booster": {
    "express-module": 3000
}
```

If the port is specified in a environment variable you can just put the env name as the value for **expres-module**.
ExpressModule defaults to 3000 if not property is set.

### Starting the server

To start the server you will need to call the **init** method in **ExpressModule**.

### Injecting ExpressModule

```ts
import { booster } from '@booster-ts/core'
import { ExpressModule} from '@booster-ts/ExpressModule';
import { Express } from 'express';

@booster()
export class Router {

    private app: Express;

    constructor(
        express: ExpressModule
    ) {
        this.app = express.getApp();
        this.app.get('/', (req, res) => {
            res.json({
                code: "00",
                text: "OK"
            })
        });
    }
}
```

To access the express server, you will need to call the `getApp()` method. You will then be able to add new Routes.
