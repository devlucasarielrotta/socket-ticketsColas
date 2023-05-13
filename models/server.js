import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server as socketServer } from 'socket.io';
import { createServer } from "http";
import { socketController } from '../sockets/sockets.controller.js';


dotenv.config();

export default class Server {

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;

        this.server = createServer(this.app);
        this.io = new socketServer(this.server);
        
        
        this.paths = {}

        this.middlewares();

        this.routes();

        // Sockets config
        this.sockets();
    }

    middlewares(){
        // cors
        this.app.use(cors());
        // lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))
    }

    routes(){

    }

    sockets(){

        this.io.on('connection', socketController)

        
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Server listening at localhost:${this.port}`)
        })
    }
}



