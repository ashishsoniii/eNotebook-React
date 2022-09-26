const express = require('express')
const { Schema, default: mongoose } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('user', UserSchema);

// User.createIndexes(); // this will l create index of email we doning it in auth
module.exports = User