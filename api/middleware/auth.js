import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
    const {token} = req.headers;
    console.log(token);
    if (!token) {
        return res.json({success: false, message: "Not authorized, please login!"})
    }

    try {
        // Get the id of the user using his token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        // And set req.body.userId to be equall to his id
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: "Error"})
    }
}

export default authMiddleware;