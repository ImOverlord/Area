import request = require("superagent");
import { BASE_URL } from "../env";

describe('Info route', () => {

    describe('About', () => {

        it("Should get Server Info", (done) => {
            request.get(`${BASE_URL}/about.json`)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.client.host).toBeDefined();
                expect(response.body.server).toBeDefined();
                expect(response.body.server.services).toBeDefined();
                done();
            });
        });

    });

    describe("Actions", () => {

        it("Should get server's action list", (done) => {
            const serviceName = 'random';

            request.get(`${BASE_URL}/actions/${serviceName}`)
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
        });

    });

    describe('Reactions', () => {
        
        it("Should get server' reaction list", (done) => {
            const serviceName = "random";

            request.get(`${BASE_URL}/reactions/${serviceName}`)
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            })
        });

    })
    

})
