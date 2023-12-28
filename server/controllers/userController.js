const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const asyncHandler = require("express-async-handler");
const sendMail = require("../services/sendEmail");
const crypto = require("crypto");
const Token = require("../models/tokenModel");

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate the user input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
  
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            block: false
        });

        // Create crypto token
        const token = await new Token({ userId: user._id, token: crypto.randomBytes(32).toString("hex") }).save();
        const url = `${process.env.CLIENT_URL}${user.id}/confirmation/${token.token}`;
        await sendMail({email}, "Verify your email address", url);

        res.status(201).json({ message: 'Email sent to your account! Please Verify', user});
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Function to authenticate a user and generate a token
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate the user input
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
    
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        if(!user.isVerified){
            let token = await Token.findOne({ userId: user._id });
            if(!token){
                const token = await new Token({ userId: user._id, token: crypto.randomBytes(32).toString("hex") }).save();
                const url = `${process.env.CLIENT_URL}${user.id}/confirmation/${token.token}`;
                await sendMail({email}, "Verify your email address", url);
            }
            return res.status(401).json({ error: 'Please verify your email first' });
        }

        // Create token
        const token = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user._id,
        }
        }, process.env.JWT_SECRET, 
        { expiresIn: "1d" });

        if (!token) {
            return res.status(400).json({ message: "Something went wrong | Invalide User" });
        }
        else {
            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage,
                    linkedin: user.linkedin,
                    github: user.github,
                    twitter: user.twitter,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                token
            });
        }
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});

//verify token
const verifyToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ message: "Invalid token" });
            } 
            req.user = decodedToken.user;
            next();
        });
    }
    if (!token) {
        return res.status(400).json({ message: "No token, authorization denied" });
    }
});

// get current user
const userCurrent = asyncHandler(async (req, res) => {
    res.json(req.user);
});

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-blogs -email -languages -bio -city -password -__v -createdAt -updatedAt");
    return res.status(200).json({ 
        UserCount: users.length,
        users
     });
});

// get user by id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v -updatedAt -createdAt -isVerified -isBlocked -blogs').populate({
        path: "blogs",
        select: "-__v -createdAt -updatedAt -body",
    }).sort({ views: -1 });
    if (user) {
        return res.status(200).json({ user });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});

//update user
const updateUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const updateData = req.body;

    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        
        Object.assign(user, updateData);
        await user.save();

        return res.status(200).json({ message: "User updated successfully" });
    }
    catch(error){
        res.status(500).json({ error: 'Failed to update user' });
    }
});

const verifyAuthToken = asyncHandler(async (req, res) => {
    const {id, token} = req.params;
    try {

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found to verify' });
        }

        const tokenn = await Token.findOne({ userId: id, token: token });
        if (!tokenn) {
            return res.status(404).json({ error: 'Token not found' });
        }

        await User.updateOne({ _id: id} ,{ isVerified: true });
        await Token.deleteOne({ userId: id}, {token: token });

        return res.status(200).json({ message: 'Token verified successfully' });

    }
    catch (error) {
        res.status(500).json({ error: 'Failed to verify token' });
    }
});

const getTotalUsers = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      
      res.status(200).json({
        totalUsers: totalUsers,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to get total users',
      });
    }
  };

module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    userCurrent,
    getAllUsers,
    getUserById,
    updateUser,
    verifyAuthToken,
    getTotalUsers
};