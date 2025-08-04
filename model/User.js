//models/User.mjs
import mongoose from "mongoose";


const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userId: {
         type: String, 
         unique: true 
    },

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        requred: true,
    },

})

const User = mongoose.model("User",UserSchema)
export default User 