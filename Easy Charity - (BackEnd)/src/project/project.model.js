'use strict'

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
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
        required: true,
        default: Date()
    },
    endDate: {
        type: Date,
        required: true,
        default: Date()
    },
    budget: {
        type: Number,
        required: true
    },
    collection: {
        type: Number,
        required: true
    },
    type:{
      type: String,
      required: true,
      enum: ['charitable', 'charitable']
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'CO',
        required: true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Project', projectSchema);