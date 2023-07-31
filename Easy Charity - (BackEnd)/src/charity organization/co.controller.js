'use strict'

const CharityOrganization = require('./co.model');
const User = require('../user/user.model');

/*TEST*/ 
exports.test = (req,res)=>{
    return res.send({message: 'Test function is runing'});
}

//agregar una organizacion
exports.addOrganitation = async(req,res)=>{
    try{
        //Traemos los datos
        let data = req.body;

        //Verificamos que exista el Usuario
        let user = await User.findOne({_id: data.user});
        if(!user) return res.status(404).send({message: 'Usuario no encontrado'});

        //Se Guarda los Datos
        let organitation = new CharityOrganization(data);
        await organitation.save();

        //Se Actualiza el rol a Admin de la Organizacion
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

//Publica para mostrar todas las organizaciones
exports.getOrganitation = async(req,res)=>{
    try{
        //Se buscan todas las organizaciones
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
        //Se trae el token
        let user = req.user.sub;
        let organitation = await CharityOrganization.find({user}).populate('user');
        return res.send({organitation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer las organizaciones', error: err.message});
    }
}

//Eliminar la Organizacion
exports.deleteOrganization = async(req,res)=>{
    try{
        //Trae el token
        let user = req.user.sub;

        //Traemos el Id de la Organizacion
        let organizationID = req.params.id;
        let organization = await CharityOrganization.findOne({_id: organizationID});

        //Se valida que no pueda eliminar la organizaciond de otro Administrador
        if(user != organization.user) return res.send({message: 'No puedes Eliminar la organizacion de otra Administrador de Organizacion'});
        let deleteOrganization = await CharityOrganization.findOneAndRemove({_id: organization._id});

        //Elimina la organizacion
        if(!deleteOrganization) return res.status(404).send({message: 'Organizacion no encontrada, no se pudo eliminar'});
        return res.send({message: 'Organizacion eliminada', deleteOrganization});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al tratar de Eliminar la Organizacion', error: err.message});
    }
}

//Actualizar Organizacion
exports.updateOrganization = async(req,res) =>{
    try{
        //Traemos los datos
        let data = req.body;
        let organizationID = req.params.id;

        //Obtenemos el token
        let user = req.user.sub;
        if(data.user) return res.send({message: 'No puedes actualizar el parametro de Usuairo'});

        //Validar que no pueda actualizar la organizacion de otro Admin
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