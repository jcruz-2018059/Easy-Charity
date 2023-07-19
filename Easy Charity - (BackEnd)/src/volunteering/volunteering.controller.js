'use strict'

const Volunteering = require('./volunteering.model');

exports.test = (req,res)=>{
    res.send({message: 'Test function is running'});
}
