import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IReaction } from '../../Interface/IReaction';
import { IForm } from '../../Interface/IForm';
import { ISendMail } from './ISendMail';
import { createTransport, createTestAccount, TestAccount } from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

@booster({
    serviceName: "Mail",
    name: "SendMail",
    type: "action"
})
export class SendMailAction implements IReaction {

    private testAccount: TestAccount;
    private transporter: Mail;

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        return createTestAccount()
        .then((account) => {
            this.testAccount = account;
            this.transporter = createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass // generated ethereal password
                }
            });
            return Promise.resolve();
        });
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "SendMail";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "SendMail Action";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Array<IForm> {
        return [{
            input: {
                name: 'email',
                title: 'Email',
                regex: `^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`
            }
        }, {
            input: {
                name: 'title',
                title: 'Title',
                regex: null
            }
        }, {
            input: {
                name: 'content',
                title: 'Content',
                regex: null
            }
        }];
    }

    /**
     * listener
     * @description Action Call Back
     */
    public execute(reactionInfo: ISendMail): Promise<void> {
        return this.transporter.sendMail({
            from: '"Area" <foo@example.com>',
            to: reactionInfo.mail,
            subject: "Hello",
            text: reactionInfo.content,
        });
    }

}

inject.register("SendMailAction", SendMailAction);