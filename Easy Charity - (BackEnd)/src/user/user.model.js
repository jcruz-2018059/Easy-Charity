'use strict'

const mongoose = require('mongoose');

// name surname username password email phone role

const userScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        uppercase: true,
        enum:['ADMIN', 'ORGANIZATION ADMIN', 'CLIENT'],
        default: 'CLIENT'
    }
}, {versionKey: false});

module.exports = mongoose.model('User', userScheme);