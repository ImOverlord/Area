import { firebase, BASE_URL } from "../env";
import request = require("superagent");

describe('Subscribe', () => {

    let token = '';

    beforeAll((done) => {
        firebase.auth().signInWithEmailAndPassword('test1@mail.com', 'password')
        .then((user) => {
            return user.user.getIdToken();
        })
        .then((userToken) => {
            token = userToken;
            done();
        });
    })
    
    describe('Time', () => {
        
        it("Subscribe EveryDayAt", (done) => {

            request.put(`${BASE_URL}/subscribe`)
            .set('Authorization', token)
            .send({
                "actionName": "EveryDayAt",
                "actionData": {
                    "hour": "00",
                    "minute": "00"
                },
                "reactionName": "SendMail",
                "reactionData": {
                    "content": "Random mail",
                    "mail": "area2020epi",
                    "title": "Random Title"
                }
                
            })
            .then((res) => {
                expect(res.body.code).toBe("00");
                done();
            });

        });

    });
    
})
