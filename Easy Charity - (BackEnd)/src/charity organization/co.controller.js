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
        if(!roleUpdate) return res.status(404).send({message: 'Usuario no encontrado, no se actualizó el rol.'});
        return res.send({message: 'Organización agregada satisfactoriamente.', organitation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al agregar una organizacion', error: err.message});
    }
}

//Publica
exports.getOrganitation = async(req,res)=>{
    try{
        let organizations = await CharityOrganization.find().populate('user');
        return res.send({organizations});
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
        let user = req.user.sub;
        let organizationID = req.params.id;
        let organization = await CharityOrganization.findOne({_id: organizationID});
        if(user != organization.user) return res.send({message: 'No puedes Eliminar la organizacion de otra Administrador de Organizacion'});
        let deleteOrganization = await CharityOrganization.findOneAndRemove({_id: organization._id});
        if(!deleteOrganization) return res.status(404).send({message: 'Organizacion no encontrada, no se pudo eliminar'});
        return res.send({message: 'Organizacion eliminada', deleteOrganization});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al tratar de Eliminar la Organizacion', error: err.message});
    }
}

exports.updateOrganization = async(req,res) =>{
    try{
        let data = req.body;
        let organizationID = req.params.id;
        let user = req.user.sub;
        if(data.user) return res.send({message: 'No puedes actualizar el parametro de Usuairo'});


        let organization = await CharityOrganization.findOne({_id: organizationID});

        if(user != organization) return res.send({message: 'No puedes editar la organizacion de otro Administrador de Organizacion'});

        let updateOrganization = await CharityOrganization.findOneAndUpdate(
            {_id: organization._id},
            data,
            {new: true}
        )
        if(!updateOrganization) return res.status(404).send({message: 'Organizacion no encontrada, no se pudo actualizar la Organizacion'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al Actualizar la Organizacion', error: err.message});
    }
}