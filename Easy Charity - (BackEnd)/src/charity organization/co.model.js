'use strict'

const mongoose = require('mongoose');


const coSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); 
            },
            message: "Please enter a valid email"
        }
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('CO', coSchema);