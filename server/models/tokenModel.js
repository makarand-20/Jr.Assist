const mongoose = require('mongoose')

const tokenModel = new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        expires: '1h', // 1 hour
        default: Date.now()
    },
})

module.exports = mongoose.model("Token", tokenModel);