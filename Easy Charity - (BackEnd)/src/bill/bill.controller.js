'use strict'

const Bill = require('./bill.model');
const User = require('../user/user.model');
const Donation = require('../donation/donation.model');

exports.test = (req,res)=>{
    return res.send({message: 'test function is running'});
}


exports.buy = async(req,res)=>{
    try{
        let userID = req.user.sub;
        let data = req.body;

        let user = await User.findOne({_id: userID});
    

        let donation = await Donation.findOne({_id: data.donation});
        if(!donation) return res.status(404).send({message: 'Donacion no encotrada'});

        //if(user._id != donation.user) return res.status(400).send({message: 'No donaste a esta organizacion'});
        
        let params = {
            name: user.name,
            surname: user.surname,
            date: Math.floor(Date.now() / 1000),
            donation: donation,
            total: donation.amount 
        };

        let bill = new Bill(params);
        await bill.save();

        return res.send({message: 'Factura Creada :', bill});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al crear la factura'});
    }
}


exports.getBill = async(req,res)=>{
    try{

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer las facturas'})
    }
}