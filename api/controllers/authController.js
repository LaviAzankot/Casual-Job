import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import db from "../config/db.js";

// Create token
function createToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

async function register(req, res) {
    const {email, password, name, phone, address} = req.body;

    try {
        // Check if the email is valid
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }

        // Check if the user already exist
        const user = await db.query("SELECT email FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            return res.json({success: false, message: "User already exists, try looging in instead"})
        } 
        // Create a new account
        else {
            // Encrypt the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // Add new user to DB
            const newUser = await db.query("INSERT INTO users (email, password, name, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING id", [email, hashedPassword, name, phone, address])
            const token = createToken(newUser.rows[0].id);
            return res.json({success: true, message: "User added succesfully", token})
        }
    } catch (error) {
        console.log(error);
    }
}

async function login(req, res){
    const {email, password} = req.body;

    try {
        // Check if the email is valid
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }

        // Check if the user exists
        let user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.json({success: false, message: "User doesn't exist, try to sign up instead"})
        } 

        user = user.rows[0];
        
        const isPassword = bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.json({success: false, message: "Password incorrect, please try again"})
        }

        const token = createToken(user.id);
        res.json({success: true, message: "User signed in succesfully", token});

    } catch (error) {
        console.log(error);
    }

}


export { register, login };