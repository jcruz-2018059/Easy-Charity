'use strict'

const mongoose = require('mongoose');

const volunteeringSchema = mongoose.Schema({
    dpi: {
        type: String,
        required: true,
        max: 13,
        min: 13
    },
    age: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    proyect:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required: true
    }
},{
    versionKey: false
});


module.exports = mongoose.model('Volunteering', volunteeringSchema);
