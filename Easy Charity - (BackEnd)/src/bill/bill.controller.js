'use strict'

const Bill = require('./bill.model');

exports.test = (req,res)=>{
    return res.send({message: 'test function is running'});
}


exports.buy = async(req,res)=>{
    try{
        let user = req.user.sub;
        let data = req.body;

        
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al crear la factura'});
    }
}