import bcrypt from 'bcryptjs';
import { AttachVehicle } from '../model/attachVehicle.model.js';
import { Driver } from "../model/driver.model.js"

export const signUp = async (req, res, next) => {
    try {
        let password = req.body.password;
        let saltKey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(password, saltKey);
        let result = await Driver.create({
            email: req.body.email,
            name: req.body.name,
            contact: req.body.contact * 1,
            customerType: req.body.customerType,
            password: encryptedPassword
        })
        return res.status(200).json({ result, status: true });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "something went wrong", status: false })
    }
}
export const signIn = async (req, res, next) => {
    let user = await Driver.findOne({ email: req.body.email });
    if (user) {
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            return res.status(200).json({ userDetail: user, status: true });
        }
        else
            return res.status(500).json({ message: "something went wrong", status: false })
    }
    else
        return res.status(500).json({ message: "something went wrong", status: false })
}

export const getAttachedVehicle = async (req, res, next) => {
    console.log(req.query.id);
    try {
        let result = await AttachVehicle.findOne({ driverId: req.query.id });
        return res.status(200).json({ result, status: true })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "something went wrong", status: false })
    }
}

export const attachVehicle = async (req, res, next) => {
    try {
        let imageArray = req.files.map(image => {
            return image.filename;
        })
        console.log(req.body);
        let result = await AttachVehicle.create({
            ownerName: req.body.ownerName,
            driverName: req.body.driverName,
            adharNumber: req.body.adharNumber,
            vehicleNumber: req.body.vehicleNumber,
            vehicleModel: req.body.vehicleModel,
            licence: imageArray[0],
            insurance: imageArray[1],
            RC: imageArray[2],
            PUC: imageArray[3],
            fitness: imageArray[4],
            driverPhoto: imageArray[5],
            driverId: req.body.driverId
        })
        res.status(201).json({ result: result, status: true })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", status: false })
    }
}