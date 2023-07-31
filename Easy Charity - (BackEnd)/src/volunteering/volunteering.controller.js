'use strict'

const Volunteering = require('./volunteering.model');
const User = require('../user/user.model');
const Proyect = require('../project/project.model');


exports.test = (req,res)=>{
    res.send({message: 'Test function is running'});
}


exports.addVolunteering  = async(req,res)=>{
    try{
        //Traer los datos
        let data = req.body;
        let user = req.user.sub;

        //Validar si existe el Usuario
        let existUser = await User.findOne({_id: user});
        if(!existUser) return restart.status(404).send({message:'Usuario no encontro, no loggueado'});

        //Validar si existe el proyecto al cual agregarse
        let proyect = await Proyect.findOne({_id: data.proyect});
        if(!proyect) return res.status(404).send({message: 'No se encontro el proyecto'});
        
        let params = {
            dpi: data.dpi,
            age: data.age,
            skills: data.skills,
            state: true,
            description: data.description,
            user: data.user,
            proyect: data.proyect
        };

        let volunteering = new Volunteering(params);
        await volunteering.save();
        return res.send({message: 'Se a ha agregado satisfactoriamente su peticion de volunariado', volunteering});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al agregarse un voluntario', error: err.message});
    }
}


exports.getVolunteering = async(req,res)=>{
    try{
        //Buscar los volunatiados
        let volunteering = await Volunteering.find().populate('user').populate('proyect')
        return res.send(volunteering)
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al obtener los voluntariados'});
    }
}

exports.cancel = async(req,res)=>{
    try{
        //Se trae el ID de voluntariado 
        let volunteeringId = req.params.id;
        let volunteering = await Volunteering.findOne({_id: volunteeringId});

        //validar que exista el voluntariado
        if(!volunteering) return res.status(404).send({message: 'Voluntario no encontrado'});

        //Se Actualiza el estado del voluntariado
        let params = {
            state : false
        }
        let updateVolunteering = await Volunteering.findOneAndUpdate(
            {_id: volunteering},
            params,
            {new: true},
        );
        if(!updateVolunteering) return res.status(404).send({message: 'No se pudo actualizar el estado'});

        return res.send({message: 'Voluntariado Cancelado'})
    }catch(err){
        console.error(err);
        return res.status(500).send
    }
}

//Eliminar el voluntariado
exports.deleteVolunteering = async(req,res)=>{
    try{
        //Se trae el ID de voluntariado
        let volunteeringID = req.params.id;

        //Verificar si existe el Voluntariado
        let volunteering = await Volunteering.findOne({_id: volunteeringID});
        if(!volunteering) return res.status(404).send({message: 'Voluntariado no encontrado'});

        //Validar que primero tenga que cancelar su voluntariado
        if(volunteering.state == true) return res.send({message: 'Debes primero cancelar el voluntariado'});


        //Eliminar el Voliuntariado
        let deleteVolunteering = await Volunteering.findOneAndRemove({_id: volunteering});
        if(!deleteVolunteering) return res.send({message:'Voluntariado no encontrado '});

        return res.send({message: 'Voluntariado eliminado exitosamente'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al eliminar tu Voluntariado', error: err.message});
    }
}

//Actualizar el Voluntariado
exports.updateVolunteering = async(req,res)=>{
    try{
        //Se consiguen los datos
        let data = req.body;
        let volunteeringId = req.params.id;

        //Validar que exista el Proyecto
        let proyect = await Proyect.findOne({_id: data.proyect});
        if(!proyect) return res.status(404).send({message: 'Proyecto no Encontrado'});

        //Colocar los parametro de Actualizar
        let params = {
            age: data.age,
            skills: data.skills,
            description: data.description,
            proyect: proyect
        }

        //Actualizar el Voluntariado
        let updateVolunteering = await Volunteering.findOneAndUpdate(
            {_id: volunteeringId},
            params,
            {new: true}
        )

        if(!updateVolunteering) return res.status(404).send({message: 'Voluntariado no encontrado, no se pudo actualizar'});
        return res.send({message: 'Voluntariado Actualizado', updateVolunteering});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al actualizar el tu Voluntariado', error: err.message});
    }
}
