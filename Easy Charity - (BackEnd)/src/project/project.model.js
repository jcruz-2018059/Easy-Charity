'use strict'

const mongoose = require('mongoose');

const projectScheme = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    takings: {
        type: Number,
        required: true,
        default: 0
    },
    type:{
      type: String,
      required: true,
      enum: ['caridad', 'voluntariado', 'recaudación' ]
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'Charity Organization',
        required: true
    }
},{versionKey: false});

module.exports = mongoose.model('Project', projectScheme);