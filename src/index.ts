import "reflect-metadata"
import cors from 'cors'
import express from 'express'
import dotenv from "./config/dotenv"
import corsOptions from "./config/middlewares/cors.middlewares"
dotenv.config()

import { AppDataSource } from "./config/databases/typeorm"
import { routingModule } from "./config/middlewares/routing.middlewares" 

import { Server } from "./config/server"

const server = new Server

server.app.use(express.json())
server.app.use(cors(corsOptions));
server.app.use(routingModule(server))

server.startServer(async () => { 
    try {
        console.log("El servidor ha arrancado puerto:", server.port);
        await AppDataSource.initialize()
        console.log("Ha arrancado la base de datos");
        
    } catch (error) {
        console.log("Ha ocurrido un error:", error);
    }
})