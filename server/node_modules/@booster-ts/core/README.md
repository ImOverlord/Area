# Booster-ts Core

Core DI Library

## Installation

You can get the latest release and the type definitions using npm:

```
$ npm install @booster-ts/core reflect-metadata --save
```

> /!\\ @booster-ts/core requires TypeScript >= 2.0, your tsconfig should look similar to the one below (experimentalDecorators, emitDecoratorMetadata are important)
```js
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

## Getting Started

You can declare dependencies with @booster() decorator.

```ts
import { booster } from '@booster-ts/core';

@booster()
export class DependencyA {
    public data: number = 0;
}
```

You can then require this dependency.

```ts
import { booster } from '@booster-ts/core';
import { DependencyA } from "./dependencyA";

@booster()
export class DependencyD {

    constructor(public a: DependencyA   ) { }

    public update() {
        this.a.data++;
    }
}
```

@booster-ts/core will resolve the dependencies needed for you

```ts
import { Injector } from '@booster-ts/core';

const injector = new Injector();
const dep: DependencyD = injector.inject(DependencyD);

dep.update();
```
