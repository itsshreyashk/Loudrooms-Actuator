import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/loudrooms'); //INSERT connection STRING

class LOG {

}
class SGUP {
    private username: string;
    private password: string;
    private age: number;
    private gender: string;
    private email: string;

    constructor(username: string, password: string, age: number, gender: string, email: string) {
        this.username = username;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.email = email;
    }
    async createUser(): Promise<any> {
        interface UserDocument extends mongoose.Document {
            username: string;
            password: string;
            age: number;
            gender: string;
            email: string;
        }

        const userSchema = new mongoose.Schema<UserDocument>({
            username: { type: String, required: true },
            password: { type: String, required: true },
            age: { type: Number, required: true },
            gender: { type: String, required: true },
            email: { type: String, required: true }
        });

        const User = mongoose.model<UserDocument>('Users', userSchema);

        const user = await User.findOne({ username: this.username }).exec();
        if (!user) {
            await User.create({ username: this.username, password: this.password, age: this.age, gender: this.gender, email: this.email });
            return true;
        } else {
            return false;
        }
    }
}

export { LOG, SGUP };