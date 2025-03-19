import bcrypt from 'bcryptjs';
import { User } from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import { validation } from '../middleware/joiValidation.js';

// import stripe from 'stripe';
// const stripeClient = new stripe('')

export const signUp = async (req, res, next) => {

    //----------------------Joi Validation-------------------------//
    const validationResult = validation.validate({ name: req.body.name, contact: req.body.contact, email: req.body.email });

    if (validationResult.error == null) {
        try {
            let password = req.body.password;
            let saltKey = await bcrypt.genSalt(10);
            let encryptedPassword = await bcrypt.hash(password, saltKey);
            let result = await User.create({
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
    else {
        return res.status(500).json({ message: "errors", status: false, errors: validationResult.error.message });
    }
}
export const signIn = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            // let payload = {subject: user._id};
            // let token =  jwt.sign(payload,'chetan123456789');

            if (validPassword)
                return res.status(200).json({ userDetail: user, status: true });
            else
                return res.status(500).json({ message: "something went wrong", status: false })
        }
        else
            return res.status(500).json({ message: "something went wrong", status: false })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "something went wrong", status: false })
    }
}

export const updateUser = async (req, res, next) => {
    const id = req.body.id;
    delete req.body.id;
    if (req.file)
        req.body.profileImage = req.file.filename;
    else
        delete req.body.profileImage;
    try {
        await User.updateOne({ _id: id }, { $set: req.body })
        let user = await User.findOne({ _id: id })
        return res.status(200).json({ userDetail: user, status: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong", status: false })
    }
}

//---------------------------For Payment------------------------------------//

// export const payment = async (req, res) => {
//     const { tokan, product } = req.body;
//     console.log("hello");
//     try {

//         const charge = await stripeClient.charges.create({
//             amount: product.price,
//             currency: 'usd',
//             description: product.name,
//             source: tokan,
//         }, (err, charge) => {
//             console.log(charge);
//             res.status(200).json({ success: charge });
//         });
//     }
//     catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }