import * as fs from 'fs';
import express, { Application, json, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import { SignUp } from './webutils/db';
import Session from './webutils/sessions';
dotenv.config();

// Create an Express application
const app: Application = express();

// Create an HTTP server using the Express app
const server: http.Server = http.createServer(app);

// Set the port for the server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// Create a Socket.IO instance attached to the server
const io: Server = new Server(server);

const admiralLength: number = 30;
// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Specify your allowed origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// Socket.IO event: Triggered when a new client connects
io.on('connection', (socket: Socket) => {
    // Log the socket connection
    console.log(`Socket connected: ${socket.id}`);

    // Socket.IO event: Triggered when a client disconnects
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

const getRandomSessionKey: any = () => {
    const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz1234567890!@#";
    let yourKey: string = "";
    for (let index = 0; index < admiralLength; index++) {
        const RandomNumber: number = Math.floor(Math.random() * chars.length);
        yourKey += chars[RandomNumber];
    }
    return yourKey;
}

app.post('/user/login', (req: Request, res: Response) => {
    const body: any = req.body;
});

app.post('/user/signup', async (req: Request, res: Response) => {
    const body: any = req.body;

    //params
    const username: string = body.username;
    const password: string = body.password;
    const age: number = body.age;
    const gender: string = body.gender;
    const email: string = body.email;

    console.log("Request...");

    const newDatabaseObject: any = new SignUp(username, password, age, gender, email)

    try {
        const status: any = await newDatabaseObject.createUser();

        if (status===true) {
            const sauceKey: string = getRandomSessionKey();
            
            
            
            //make here to create sessions and associate them with username and password of the user...
            await new Session(sauceKey, username, password).addSession();



            console.log(`Created.`);

            res.status(200).json({
                info: "User created successfully.",
                sauceKey: sauceKey,
            })
        } else {
            res.status(500).json({
                info: "Username already exists.",
            })
        }

    } catch (err: any) {
        res.status(500).json({
            info: "Error creating user.",
        })
        console.log(`Failed. ${err}`);
    }
});
// Start the server and listen on the specified port
server.listen(PORT, () => {
    // Log a message indicating the server is listening
    console.log(`Server listening on port ${PORT}`);
});