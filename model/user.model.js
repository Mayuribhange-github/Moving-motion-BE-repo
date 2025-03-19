import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    customerType: {
        type: String,
        required: true
    },
    profileImage:{
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
export const User = mongoose.model("user", userSchema);