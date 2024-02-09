import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/loudrooms');

interface UserDocument extends mongoose.Document {
    username: string;
    password: string;
}
const userSchema: any = new mongoose.Schema<UserDocument>({
    username: { type: String, required: true },
    password: { type: String, required: true },
})
const UserModel = mongoose.models.Users || mongoose.model<UserDocument>('Users', userSchema);

class Log {
    private username: string;
    private password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    async checkUser(): Promise<boolean> {
        const user = await UserModel.findOne({ username: this.username, password: this.password });
        if (user) {
            return true;
        } else {
            // If no user is found, return false
            return false;
        }
    }
}
export default Log;