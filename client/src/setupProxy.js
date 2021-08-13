/************************************************************************
> File name: setupProxy.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: Proxy for connecting React.js to Express
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy('/api', {
            target: 'http://localhost:8081',
            changeOrigin: true
        })
    )
};