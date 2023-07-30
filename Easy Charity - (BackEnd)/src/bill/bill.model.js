'use strict'


const mongoose = require('mongoose');


const billSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date()
    },
    donation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: true
    },
    total:{
        type: Number,
        required: true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Bill', billSchema);