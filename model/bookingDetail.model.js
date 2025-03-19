import mongoose from "mongoose";
const vehicleBookingSchema = new mongoose.Schema({
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
    biding:[],
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }
})
export const vehicleBooking = new mongoose.model("vehiclebooking", vehicleBookingSchema)
