import * as fs from 'fs';
import express, { Application, json, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import DB from './webutils/db';
dotenv.config();

// Create an Express application
const app: Application = express();

// Create an HTTP server using the Express app
const server: http.Server = http.createServer(app);

// Set the port for the server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// Create a Socket.IO instance attached to the server
const io: Server = new Server(server);

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

app.post('/user/login', (req: Request, res: Response) => {
    const body: any = req.body;
});

app.post('/user/signup', (req: Request, res: Response) => {
    const body: any = req.body;
});
// Start the server and listen on the specified port
server.listen(PORT, () => {
    // Log a message indicating the server is listening
    console.log(`Server listening on port ${PORT}`);
});