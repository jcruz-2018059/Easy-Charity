'use strict'

const Project = require('./project.model')
const { encrypt, validateData, checkPassword } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}