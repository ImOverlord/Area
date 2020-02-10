import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IApplet } from '../../Interface/IApplet';
import { IAction } from '../../Interface/IAction';

@booster()
export class InfoModule {

    private services = ['Time'] /** @todo Replace with firebase */

    constructor() { }

    /**
     * getAbout
     */
    public getAbout() {
        const services = [];
        for (const service of this.services) {
            const serviceInformation = {
                name: service,
                actions: [],
                reactions: []
            };
            const containers = inject.getContainerByValue<IApplet, {type: string}>('serviceName', service);
            for (const container of containers)
                if (container.data.type === "action" || container.data.type === "reaction")
                    serviceInformation[`${container.data.type}s`].push({
                        name: container.class.getName(),
                        description: container.class.getDescription()
                    });
            services.push(serviceInformation);
        }
        return services;
    }

    /**
     * getActions
     */
    public getActions(service: string) {
        return this.getApplet(service, 'action');
    }

    /**
     * getReactions
     */
    public getReactions(service: string) {
        return this.getApplet(service, 'reaction');
    }

    private getApplet(service: string, type: 'action' | 'reaction') {
        const containers = inject.getContainerByValue<IApplet, {type: string}>('serviceName', service);
        const applets = [];
        
        for (const container of containers) {
            if (container.data.type !== type)
                continue;
            applets.push({
                name: container.class.getName(),
                description: container.class.getDescription(),
                form: container.class.getForm()
            });
        }
        return applets;
    }

}