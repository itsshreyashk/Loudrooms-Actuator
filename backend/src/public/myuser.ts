import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
    username: string;
}
const userSchema = new mongoose.Schema<UserDocument>({
    username: { type: String, required: true }
});

const UserModel = mongoose.models.Users || mongoose.model<UserDocument>('Users', userSchema);

class User {
    private username: string;
    constructor(username: string) {
        this.username = username;
    }
    async getData(): Promise<any> {
        const user = await UserModel.findOne({ username: this.username }).exec();
        if (user) {
            return { status: 200, age: user.age, gender: user.gender, username: user.username };
        } else {
            return { status: 500 };
        }
    }

}
export default User;