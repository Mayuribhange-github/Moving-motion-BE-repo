import mongoose from "mongoose";
const completOrdersSchema = new mongoose.Schema({
    pickUpLocation: {
        type: String,
        required: true
    },
    pickUpContact: {
        type: Number,
        required: true,
    },
    deliveryLocation: {
        type: String,
        required: true,
    },
    destinationContact: {
        type: Number,
        required: true
    },
    pickUpDate: {
        type: String,
        required: true,
    },
    biding: [],
    driverDetail:{ },
    driverId:{
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }
});
export const CompletOrders = mongoose.model("completeOrder", completOrdersSchema);