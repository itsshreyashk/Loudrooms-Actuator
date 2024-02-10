import * as fs from 'fs';
import express, { Application, json, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import { SignUp } from './webutils/db';
import Log from './webutils/log';
import GetData from './webutils/access';
import { AddSession, CheckRemoveSession } from './webutils/sessions';
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

app.post('/user/login', async (req: Request, res: Response) => {
    const body: any = req.body;
    const username: string = body.username;
    const password: string = body.password;
    const newLogObject: any = new Log(username, password);

    try {
        const checkUser: any = await newLogObject.checkUser();
        if (checkUser === true) {
            const sauceKey: string = getRandomSessionKey();
            await new AddSession(sauceKey, username, password).addSession();
            res.status(200).json({
                info: "Log In Successfull.",
                sauceKey: sauceKey,
            })

        } else {
            res.status(500).json({
                info: "Log In not Successfull.",
            })

        }
    } catch (err: any) {
        res.send(500).json({
            info: "Internal Server Error.",
        })
    }
});

//Peice of Code for later optimizations
interface CreateUserInterface {
    username: string,
    password: string,
    age: number,
    gender: string,
    email: string,
}
const CreateUser: (userData: CreateUserInterface) => Promise<any> = async (userData) => {
    const newDatabaseObject: any = new SignUp(userData.username, userData.password, userData.age, userData.gender, userData.email)

    try {
        const status: any = await newDatabaseObject.createUser();

        if (status === true) {
            const sauceKey: string = getRandomSessionKey();


            //make here to create sessions and associate them with username and password of the user...
            await new AddSession(sauceKey, userData.username, userData.password).addSession();

            console.log(`Created.`);

            return {
                info: "User created successfully.",
                sauceKey: sauceKey,
            }
        } else {
            return {
                info: "Username already exists.",
            }
        }

    } catch (err: any) {
        console.log(`Failed. ${err}`);
        return {
            info: "Error creating user.",
        }
    }
}
//Piece ends here.
app.post('/user/signup', async (req: Request, res: Response) => {
    const body: any = req.body;

    //params
    const username: string = body.username;
    const password: string = body.password;
    const age: number = body.age;
    const gender: string = body.gender;
    const email: string = body.email;
    const newDatabaseObject: any = new SignUp(username, password, age, gender, email)

    try {
        const status: any = await newDatabaseObject.createUser();

        if (status === true) {
            const sauceKey: string = getRandomSessionKey();


            //make here to create sessions and associate them with username and password of the user...
            await new AddSession(sauceKey, username, password).addSession();


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



app.post('/remove/sessions', async (req: Request, res: Response) => {
    const body = req.body;
    const sauceKey: string = body.sessionKey;

    const newSessionObject = new CheckRemoveSession(sauceKey);

    try {
        const status: boolean = await newSessionObject.removeSession();
        if (status) {
            res.status(200).json({
                status: true,
            });
        } else {
            res.status(500).json({
                status: false,
            });
        }
    } catch (err: any) {
        res.status(500).json({
            status: false,
        });
    }
})
// Start the server and listen on the specified port



//Get whatever data you like.

app.post('/get/data', async (req: Request, res: Response) => {
    const body: any = req.body;
    const contents: any = body.contents;
    const sessionKey: any = body.sauceKey;

    //Retrieving data of username and password from session Key.
    const SessionObject: any = new CheckRemoveSession(sessionKey);

    //Getting creds
    const mydata: any = await SessionObject.getSessionData();

    const username: string = mydata.username;
    const password: string = mydata.password;

    //Retrieving data
    const newObj: any = new GetData(username, password); //new Object
    const Mydata: any = await newObj.getAllData(); //All the data.

    let giveData: any = {}; // Initialize giveData object

    contents.forEach((element: any) => {
        giveData[element] = Mydata[element];
    });

    res.status(200).json(giveData);

})
app.post('/get/user', async (req: Request, res: Response) => {
    const body: any = req.body;
    const username: any = body.username;
})
server.listen(PORT, () => {
    // Log a message indicating the server is listening
    console.log(`Server listening on port ${PORT}`);
});