import Redis from 'ioredis';
const redis = new Redis();

class CreateRemoveRooms {
    private roomID: string;
    constructor(roomID: string) {
        this.roomID = roomID;
    }

}
class CreateRemoveRoomUsers {
    private username: string;
    constructor(username: string) {
        this.username = username;
    }

}
class CreateRemoveMessages {

}
export { CreateRemoveRooms, CreateRemoveRoomUsers, CreateRemoveMessages };