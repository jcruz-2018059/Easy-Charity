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
        default: Date.now()
    },
    proyect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyect',
        required: true
    },
    charityOrganization:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Charity Organization',
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