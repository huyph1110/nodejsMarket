var express = require('express');
var mongoose = require('mongoose');

const { dbUrl } = require('./constant');


mongoose.connect(dbUrl);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connection Successful!");
});
