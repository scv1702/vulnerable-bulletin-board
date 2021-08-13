/************************************************************************
> File name: userRouter.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: REST API related to member registration, login, and logout functions
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Return a list of all member
router.get('/list', async (req, res) => {
    try {
        const user = await User.find({});
        res.json({ message: user });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// Join Membership - Vulnerable to NoSQL Injection
router.post('/regist', async (req, res) => {
    try {
        // Username duplicate check
        let user = await User.findOne({ username: req.body.username });
        // When username is duplicated
        if (user) {
            res.json({
                message: 'Username is duplicated. Please enter a new one.',
                dupYn: '1'
            });
            // When username is not duplicated
        } else {
            user = new User({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                email: req.body.email
            });
            await user.save();
            console.log(`[/user/regist] ${user.username} registed`)
            res.json({ message: 'Membership registration was successful!', dupYn: '0' });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// Login - Vulnerable to NoSQL Injection
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        if (user) {
            req.session.username = user.username;
            req.session._id = user._id;
            res.json({
                message: 'You are logged in!',
                _id: user._id,
                username: user.username,
                auth: true
            });
            console.log(`[/user/login] ${req.session.username} logined`);
        } else {
            res.json({ message: 'Username or password do not match.', auth: false });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: 'Login failed. Please try again.' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    console.log(`[/user/logout] ${req.session.username} logouted`);
    // Destroy session
    req.session.destroy(() => {
        res.json({ message: true });
    });
});

// Withdrawal
router.post('/delete', async (req, res) => {
    try {
        await User.deleteOne({
            _id: req.body._id
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// Check is user logged in
router.post('/isLogin', (req, res) => {
    if (req.session.username) {
        res.json({ message: true });
    } else {
        res.json({ message: false });
    }
})

// Return _id value of user 
router.post('/getUser_ID', async (req, res) => {
    if (req.session.uesrname) {
        const user = await User.findOne({ username: req.session.username });
        res.json({ _id: user._id });
    } else {
        res.json({ _id: false });
    }
})

module.exports = router;