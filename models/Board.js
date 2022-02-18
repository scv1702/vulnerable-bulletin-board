/************************************************************************
> File name: Board.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: MongoDB schema for bulletin boards
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;

// DB schema
const postSchema = new Schema({
    writer: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imgPath: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

const Board = mongoose.model('Board', postSchema);

module.exports = Board;