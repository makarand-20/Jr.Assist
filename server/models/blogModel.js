const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    body: {
        type: String,
        required: [true, 'Body is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    views: {
        type: Number,
        default: 0,
    },
    upvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, 
    {
    timestamps: true,
    }
);

module.exports = mongoose.model('Blog', blogSchema);