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
            role: 'ORGANIZATION ADMIN'
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

exports.deleteOrganization = async(req,res)=>{
    try{
        let organizationID = req.params.id;
        let deleteOrganization = await CharityOrganization.findOneAndRemove({_id: organizationID});
        if(!deleteOrganization) return res.status(404).send({message: 'Organizacion no encontrada, no se pudo eliminar'});
        return res.send({message: 'Organizacion eliminada', deleteOrganization});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al tratar de Eliminar la Organizacion'});
    }
}