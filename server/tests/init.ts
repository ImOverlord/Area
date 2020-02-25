import { spawn } from 'child_process';

export default async() => {
    return new Promise((resolve, reject) => {
        if (!process.env.CI)
            return resolve();
        const service = spawn(`npm`, ['start']);
        global['__SERVER_PID__'] = service.pid;
        service.stdout.on('data', (data: Buffer) => {
            const output = data.toString();
            console.log(output);
            if (output.match(/Init/))
                resolve();
        });
    });
};