'use strict'

const CharityOrganization = require('./co.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is runing'});
}