import mongoose from "mongoose";
const cancelOrderSchema = new mongoose.Schema({
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
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }
})
export const CancelOrder = new mongoose.model("cancelorder", cancelOrderSchema)
