import Redis from 'ioredis';
const redisClient = new Redis();

class RoomManager {
    private roomKey: string;
    constructor(roomKey: string) {
        this.roomKey = roomKey;
    }
}

class UserManager {
    private username: string;
    private roomKey: string;
    constructor(username: string, roomKey: string) {
        this.username = username;
        this.roomKey = roomKey;
    }

}

class MessageManager {
    private username: string;
    private time: string;
    constructor(username: string, time: string) {
        this.username = username;
        this.time = time;
    }
}

export { RoomManager, UserManager, MessageManager };