import express from 'express'
import dotenv from './dotenv';
dotenv.config()

export class Server { 
    app: express.Application;
    port: number;

    constructor(){ 
        this.app = express();
        this.port = Number(process.env.PORT)
    }

    startServer(callback: VoidFunction) {
        this.app.listen(this.port, callback)
    }
}
