import Redis from 'ioredis';

const redis = new Redis();

class Session {
    private sessionID: string;
    private username : string;
    private password : string;
    private TTL_SECONDS: number = 7 * 24 * 60 * 60; // 7 days in seconds

    constructor(sessionID: string, username : string, password : string) {
        this.sessionID = sessionID;
        this.username = username;
        this.password = password;
    }
    // Function to add a session ID to the set

    async addSession(): Promise<boolean> {
        try {
            await redis.sadd('sessions', this.sessionID);
            await redis.expire('sessions', this.TTL_SECONDS);
            console.log(`Session ID "${this.sessionID}" added to the Redis set`);
            return true
        } catch (err: any) {
            console.log(`There is an error ${err.message}`);
            return false
        }
    }
    // Function to check if a session ID exists in the set

    async isSessionExist(): Promise<boolean> {
        const exists = await redis.sismember('sessions', this.sessionID);
        console.log(`Session ID "${this.sessionID}" exists in the Redis set: ${exists === 1}`);
        return exists === 1;
    }
    // Function to remove a session ID from the set

    async removeSession(): Promise<boolean> {
        try {
            const removed = await redis.srem('sessions', this.sessionID);
            console.log(`Session ID "${this.sessionID}" removed from the Redis set: ${removed === 1}`);
            return true;
        } catch (err: any) {
            console.log(`There is an error ${err.message}`);
            return false;
        }
    }

}
export default Session;