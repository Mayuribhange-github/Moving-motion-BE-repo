import mongoose from "mongoose";
const driverSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
export const Driver = mongoose.model("driver", driverSchema);