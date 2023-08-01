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
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); 
            },
            message: "Porfavor ingrese un correo válido."
        }
    },
    birthdate:{
        type: Date,
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