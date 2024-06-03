const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).json({message: 'Not authorized'});
    } else {
        
            if (token.startsWith("Bearer ")) {
                 token = token.split(' ')[1] ;  
                 try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    if (decoded) {
                        const user = await User.findById(decoded.id); 
                        req.user = user;
                        next();
                    }
                 } catch(error) {
                    res.status(401).json({message: 'Not authorized'});
                 }

            } else { 
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    if (decoded) {
                        const user = await User.findById(decoded.id).select('-password');
                        req.user = user;
                        next();
                    }
                } catch(error) {
                    res.status(401).json({message: 'Not authorized'});
                }
            }

            }
        
    }
)


module.exports = protect;


