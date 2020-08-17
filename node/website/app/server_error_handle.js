const fs = require('fs');
const path = require('path');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flag: 'a' });

module.exports = function(server) {

    server.use(logger('combined', { stream: accessLogStream }));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser());

};
