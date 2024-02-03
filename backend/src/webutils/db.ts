import mongoose from "mongoose";

class DB {
    private me : string = "me";
    constructor (me : string) {
        this.me = me;
    }
}

export default DB;