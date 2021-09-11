const express = require('express');
const UserModel = require('../models/User');
const router = express.Router();

const jwt = require('jsonwebtoken');
const  argon2  = require('argon2');
const { json } = require('express');


// @route POST /api/auth/register
// @desc register user
// @access Public

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // validate
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: " Missing username or password" });

    try {
        const user = await UserModel.findOne({username: username});
        console.log(user ? true : false);
        if(user)
            return res
            .status(400)
            .json({ success: false, message: " this User already" });

        // All good
        const hashPassword = await argon2.hash(password);
        const newUser = new UserModel({username:username,password:hashPassword});
        await newUser.save();

        // return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET);

        return res.json({success: true, message: "User is created, Successfully", accessToken});

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({success:false, message: "Internal server error"});
    }
});


// @route POST /api/auth/login
// @desc login user
// @access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // validate
    if (!username)
        return res
            .status(400)
            .json({ success: false, message: " Missing username" });
   
    if (!password)
        return res
            .status(400)
            .json({ success: false, message: " Missing password" });

    try {
        const user = await UserModel.findOne({username: username});
        console.log(user ? true : false);
        if(!user)
            return res
            .status(401)
            .json({ success: false, message: " User not exist" });

        //verify password
        const verifyPassword = await argon2.verify(user.password, password);
       
        if(!verifyPassword)
            return  res
            .status(401)
            .json({ success: false, message: "Username or password invalid" });

        // All good
        return res.json({success: true, message: "User login, Successfully", user});

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({success:false, message: "Internal server error"});
    }
});


module.exports = router;