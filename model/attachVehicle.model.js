import mongoose from "mongoose";
const attachVehicleSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    adharNumber: {
        type: Number,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    licence: {
        type: String,
        required: true
    },
    insurance: {
        type: String,
        required: true
    },
    RC: {
        type: String,
        required: true
    },
    PUC: {
        type: String,
        required: true
    },
    fitness: {
        type: String,
        required: true
    },
    driverPhoto: {
        type: String,
        required: true
    },
    driverId: {
        type: mongoose.Schema.ObjectId,
        ref: "driver"
    }
})
export const AttachVehicle = mongoose.model("vehicleAttach", attachVehicleSchema);