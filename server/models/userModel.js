const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        maxlength: 20,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 6,
    },
    bio: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: 'profile.png',
    },
    city: {
      type: String,
      default: '',
    },
    jobRole: {
      type: String,
      default: '',
    },
    languages: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }],
  }, { timestamps: true }); 
  
const User = mongoose.model('User', userSchema);
module.exports = User;  