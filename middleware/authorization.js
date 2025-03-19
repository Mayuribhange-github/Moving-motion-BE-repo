import jwt from "jsonwebtoken";
export const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let token = req.headers.authorization;
            console.log(token)
            let result = jwt.verify(token, 'chetan123456789');
            console.log(result);
            next();
        }
        else
            return res.status(401).json({ error: "unauthorized user", status: false });
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "unauthorized user", status: false });
    }
}
