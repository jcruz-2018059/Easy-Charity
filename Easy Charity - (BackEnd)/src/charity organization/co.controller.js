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

        let params = {
            role: '0RGANIZATION ADMIN'
        }
        let roleUpdate = await User.findOneAndUpdate(
            {_id: user},
            params,
            {new: true}
        )
        if(!roleUpdate) return res.status(404).send({message: 'Usuario no encontrado, no se actualizo el Rol'});
        return res.send({message: 'Organizacion agregada satisfactoriamente', organitation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al agregar una organizacion', error: err.message});
    }
}

//Publica
exports.getOrganitation = async(req,res)=>{
    try{
        let organitation = await CharityOrganization.find().populate('user');
        return res.send({organitation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer las organizaciones', error: err.message});
    }
}

//Privado
exports.getOrganitationAdmin = async(req,res)=>{
    try{
        let user = req.user.sub;
        let organitation = await CharityOrganization.find({user}).populate('user');
        return res.send({organitation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer las organizaciones', error: err.message});
    }
}