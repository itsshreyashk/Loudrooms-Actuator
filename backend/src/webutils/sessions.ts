import Redis from 'ioredis';

const redis = new Redis();

class AddSession {
    private sessionID: string;
    private username: string;
    private password: string;
    private TTL_SECONDS: number = 7 * 24 * 60 * 60; // 7 days in seconds

    constructor(sessionID: string, username: string, password: string) {
        this.sessionID = sessionID;
        this.username = username;
        this.password = password;
    }
    // Function to add a session ID to the set

    async addSession(): Promise<boolean> {
        try {
            await redis.hmset(this.sessionID, 'username', this.username, 'password', this.password);
            await redis.expire(this.sessionID, this.TTL_SECONDS);
            console.log(`Session ID "${this.sessionID}" added to the Redis hash with username and password`);
            return true;
        } catch (err: any) {
            console.log(`There is an error ${err.message}`);
            return false;
        }
    }
}
class CheckRemoveSession {
    private sessionID: string;
    constructor(sessionID: string) {
        this.sessionID = sessionID;
    }

    async isSessionExist(): Promise<boolean> {
        const exists = await redis.exists(this.sessionID);
        return exists === 1;
    }
    async getSessionData(): Promise<{ username: string, password: string } | null> {
        try {
            const exists = await redis.exists(this.sessionID);
            if (exists === 1) {
                const userData = await redis.hmget(this.sessionID, 'username', 'password');
                if (userData[0] && userData[1]) {
                    return { username: userData[0], password: userData[1] };
                } else {
                    console.log(`Error retrieving user data for session ID "${this.sessionID}" from Redis hash`);
                    return null;
                }
            } else {
                console.log(`Session ID "${this.sessionID}" does not exist in the Redis hash`);
                return null;
            }
        } catch (err: any) {
            console.log(`There is an error ${err.message}`);
            return null;
        }
    }

    // Function to remove a session ID from the set

    async removeSession(): Promise<boolean> {
        try {
            const removed = await redis.del(this.sessionID);
            console.log(`Session ID "${this.sessionID}" removed from the Redis hash: ${removed === 1}`);
            return true;
        } catch (err: any) {
            console.log(`There is an error ${err.message}`);
            return false;
        }
    }

}

export { AddSession, CheckRemoveSession };