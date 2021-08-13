/************************************************************************
> File name: boardRouter.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: REST API related to bulletin board function
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

// Create post
router.post('/write', async (req, res) => {
    try {
        if (req.session.username) {
            const post = new Board({
                writer: req.session._id,
                title: req.body.title,
                content: req.body.content
            });
            await post.save();
            console.log(`[/board/write] ${req.session.username} posted ${post._id}`)
            res.json({ message: 'Your post has been uploaded.' });
        } else {
            res.json({ message: false });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// Delete post
router.post('/delete', async (req, res) => {
    try {
        if (req.session.username) {
            const post = await Board.findOne({ _id: req.body.post_id }).populate('writer');
            if (post.writer.username === req.cookies.login_username) {
                await Board.deleteOne({
                    _id: req.body.post_id
                });
                console.log(`[/board/delete] ${req.session.username} deleted ${post._id}`)
                res.json({ message: true });
            } else {
                res.json({ message: false });
            }
        } else {
            res.json({ message: false });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// Update post
router.post('/update', async (req, res) => {
    try {
        if (req.session.username) {
            const post = await Board.findOne({ _id: req.body.post_id }).populate('writer');
            if (post.writer.username === req.cookies.login_username) {
                await Board.updateOne({
                    _id: req.body.post_id
                }, {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        updatedAt: Date.now()
                    }
                });
                console.log(`[/board/update] ${req.session.username} updated ${post._id}`)
                res.json({ message: 'The post has been edited.' });
            } else {
                res.json({ message: false });
            }
        } else {
            res.json({ message: false });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// Return a list of all post
router.post('/list', async (req, res) => {
    try {
        // Page to show
        let page = Math.max(1, parseInt(req.body.page));

        // Number of posts to be displayed on one page
        let limit = Math.max(1, parseInt(req.body.limit));

        page = !isNaN(page) ? page : 1;
        limit = !isNaN(limit) ? limit : 10;

        const skip = (page - 1) * limit;
        const count = await Board.countDocuments({});
        const maxPage = Math.ceil(count / limit);

        const list = await Board.find({})
                        .populate('writer')
                        .sort({ createdAt: -1 })
                        .skip(skip)
                        .limit(limit);
        res.json({ list, currentPage: page, maxPage, limit });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// Read more about the post
router.post('/detail', async (req, res) => {
    try {
        const board = await Board.find({ _id: req.body._id }).populate('writer');
        res.json({ board });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

module.exports = router;