const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const generateToken = async (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET , {
        expiresIn: '30d'
    });
    return token;
}
const registerUser = asyncHandler(async (req, res) => {
    try {
        const {name , email , password } = req.body;
        if (name.length ===0 || email.length ===0 || password.length ===0) {
            return res.status(400).json({message: 'All fields are required'});
        } else { 
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({message: 'User already exists'});
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const user = await User.create({name , email , password: hashedPassword }); 
                const token = await generateToken(user._id); 
                console.log(process.env.JWT_SECRET)

                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: token ,
                    isAdmin: user.isAdmin
                });
            }
        }
           
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
    
}); 
const loginUser = asyncHandler(async (req, res) => {
    try {
        const {email , password} = req.body;
        if (email.length ===0 || password.length ===0) {
            return res.status(400).json({message: 'All fields are required'});
        } else {
            const user = await User.findOne({ email: email }); 
            if (!user) {
                return res.status(400).json({message: 'User not found'});
            } else {
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (passwordsMatch) {
                    const token = await generateToken(user._id);
                    res.status(200).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        token: token
                    });
                } else {
                    return res.status(400).json({message: 'Password is incorrect'});
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}) 

const getme = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

module.exports = { registerUser , loginUser , getme};
