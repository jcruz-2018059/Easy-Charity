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
        

        let volunteering = new Volunteering(data);
        await volunteering.save();
        return res.send({message: 'Se a ha agregado satisfactoriamente su peticion de volunariado', volunteering});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al agregarse un voluntario', error: err.message});
    }
}