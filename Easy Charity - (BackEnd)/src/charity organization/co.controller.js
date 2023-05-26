'use strict'

const CharityOrganization = require('./co.model');
const User = require('../user/user.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is runing'});
}

exports.addOrganitation = async(req,res)=>{
    try{
        let data = req.body;
        let user = await User.findOne({_id: data.user});
        if(!user) return res.status(404).send({message: 'Usuario no encontrado'});
        let organitation = new CharityOrganization(data);
        await organitation.save();
        return res.send({message: 'Organizacion agregada satisfactoriamente', organitation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al agregar una organizacion', error: err.message});
    }
}

exports.getOrganitation = async(req,res)=>{
    try{
        let organitation = await CharityOrganization.find().populate('user');
        return res.send({organitation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer las organizaciones', error: err.message});
    }
}