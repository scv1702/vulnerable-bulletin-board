/************************************************************************
> File name: util.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: A collection of utility functions
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import axios from 'axios';

// Check if user is logged in
export const isUserLogin = async () => {
    let isLogin;
    await axios.post('/api/user/isLogin').then(returnData => {
        if (returnData.data.message) {
            isLogin = true;
        } else {
            isLogin = false;
        }
    }).catch(err => {
        console.log(err);
    })
    return isLogin;
}