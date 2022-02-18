/************************************************************************
> File name: server.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: Main server of express
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8081;
let MONGO_DB;

// DB settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
fs.readFile('DB_KEY.txt', 'utf8', (err, data) => {
  MONGO_DB = data;
  mongoose.connect(MONGO_DB);
})

const db = mongoose.connection;
db.once('open', function () {
  console.log('DB connected');
});
db.on('error', function (err) {
  console.log('DB ERROR : ', err);
});

// Middle-ware settings
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "kert",
    cookie: {
      httpOnly: false,
      secure: false
    }
  })
);

// Routes
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/board', require('./routes/boardRouter'));

// Port settings
app.listen(port, () => {
  console.log('Server on! http://localhost:' + port);
});