import { Injector } from '../src/core';
import { DependencyA } from '../src/mocks/dependencyA.mock';
import { DependencyB } from '../src/mocks/dependencyB.mock';
import { DependencyC } from '../src/mocks/dependencyC.mock';
import { DependencyD } from '../src/mocks/dependencyD.mock';
import { DependencyE } from '../src/mocks/dependencyE.mock';
import { DependencyF } from '../src/mocks/dependencyF.mock';

describe("Basic Injection Test", () => {

    let injector: Injector;

    describe("Register", () => {

        beforeEach(() => {
            injector = new Injector();
        });

        it("Should add a dependencie", () => {
            const dep: DependencyA = injector.register("DependencyA", DependencyA);

            expect(injector['container'].length).toBe(1);
            expect(dep).toBeInstanceOf(DependencyA);
        });

        it("Should Add 2 times the same dependency", () => {
            injector.register('DependencyA', DependencyA);
            injector.register('DependencyA', DependencyA);

            expect(injector['container'].length).toBe(1);
        });

        it("Should register complex dependency", () => {
            const dep: DependencyD = injector.register("DependencyD", DependencyD);

            expect(injector['container'].length).toBe(2);
            expect(dep).toBeInstanceOf(DependencyD);
        });

    });

    describe("Inject", () => {

        beforeEach(() => {
            injector = new Injector();
        });

        it("Should retreive", () => {
            const dep: DependencyC = injector.inject(DependencyC);

            expect(dep).not.toBeNull();
            expect(dep).not.toBeUndefined();
            expect(dep.a).not.toBeNull();
            expect(dep.a).not.toBeUndefined();
        });

        it("Shouldn't instanciated multiple time the same dependency", () => {
            const dep: DependencyC = injector.inject(DependencyC);
            const dep2: DependencyD = injector.inject(DependencyD);

            expect(dep.a.data).toBe(0);
            dep.update();
            expect(dep.a.data).toBe(1);
            expect(dep2.a.data).toBe(1);
        });

        it("Should register Mocks", () => {
            injector.register("DependencyA", DependencyB);

            const dep: DependencyA = injector.inject(DependencyA);
            expect(injector['container'].length).toBe(1);
            expect(dep).toBeInstanceOf(DependencyB);
        });

        it("Should resolve a 'complex' dependency tree", () => {
            const dep: DependencyE = injector.inject(DependencyE);

            expect(dep).not.toBeNull();
            expect(dep).not.toBeUndefined();
            expect(dep.a).not.toBeNull();
            expect(dep.a).not.toBeUndefined();
            expect(dep.d).not.toBeNull();
            expect(dep.d).not.toBeUndefined();
            expect(dep.d.a).not.toBeNull();
            expect(dep.d.a).not.toBeUndefined();
            expect(dep.a.data).toBe(0);
            dep.update();
            expect(dep.a.data).toBe(1);
            expect(dep.d.a.data).toBe(1);
        });

    });

    describe("getByKey", () => {

        beforeEach(() => {
            injector = new Injector();
        });

        it("Should retreive class with a certain key as metadata", () => {
            injector.register("DependencyF", DependencyF);
            injector.register("DependencyB", DependencyA);

            const arr = injector.getByKey('type');
            expect(arr.length).toBe(1);
            expect(arr[0]).toBeInstanceOf(DependencyF);
        });

    });

    describe("getByValue", () => {

        beforeEach(() => {
            injector = new Injector();
        });

        it("Should retreive class with a certain key as metadata", () => {
            injector.register("DependencyF", DependencyF);
            injector.register("DependencyF", DependencyB);
            injector.register("DependencyA", DependencyA);

            const arr = injector.getByValue('type', "plugin");
            expect(arr.length).toBe(1);
            expect(arr[0]).toBeInstanceOf(DependencyF);
        });

    });

    describe("getContainerByKey", () => {

        beforeEach(() => {
            injector = new Injector();
        });

        it("Should retreive class with a certain key as metadata", () => {
            injector.register("DependencyF", DependencyF);
            injector.register("DependencyA", DependencyA);

            const arr = injector.getContainerByKey('type');
            expect(arr.length).toBe(1);
            expect(arr[0].target).toBe(DependencyF);
            expect(arr[0].data.type).toBe("plugin");
        });

    });

    describe("getContainerByValue", () => {

        beforeEach(() => {
            injector = new Injector();
        });

        it("Should retreive class with a certain key as metadata", () => {
            injector.register("DependencyF", DependencyF);
            injector.register("DependencyA", DependencyA);

            const arr = injector.getContainerByValue<DependencyF, {type: string}>('type', "plugin");
            expect(arr.length).toBe(1);
            expect(arr[0].target).toBe(DependencyF);
            expect(arr[0].data.type).toBe("plugin");
        });

    });

});
