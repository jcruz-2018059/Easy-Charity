'use strict'

const mongoose = require('mongoose');

const donationScheme = mongoose.Schema({
    amount : {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Visa', 'MasterCard', 'PayPal']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: true
    }
},{versionKey: false});

module.exports = mongoose.model('Donation', donationScheme);