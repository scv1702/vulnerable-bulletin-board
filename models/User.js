/************************************************************************
> File name: User.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: MongoDB schema for users
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
const mongoose = require('mongoose');

// DB schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;