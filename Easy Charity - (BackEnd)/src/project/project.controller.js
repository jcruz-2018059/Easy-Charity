'use strict'

const Project = require('./project.model');
const Organization = require('../charity organization/co.model');
const { encrypt, validateData, checkPassword } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}

exports.add = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            budget: data.budget,
            type: data.type,
            organization: data.organization
        }
        let validate = validateData(params);
        if (validate) {
            return res.status(400).send({ validate });
        }
        if(new Date(data.startDate).getTime() < new Date(Date.now()).getTime()){
            return res.status(400).send({message: 'La fecha de inicio no puede ser antes que hoy.'});
        }
        if(new Date(data.endDate).getTime() <= new Date(Date.now()).getTime()){
            return res.status(400).send({message: 'La fecha de finalización no puede ser antes que hoy.'});
        }
        if(data.startDate > data.endDate){
            return res.status(400).send({message: 'La fecha de inicio no puede ser después de la de finalización.'});
        }
        if(data.budget <= 0){
            return res.status(400).send({message: 'Debes colocar un presupuesto válido.'});
        }
        data.takings = 0;
        let organization = await Organization.findOne({_id: data.organization});
        if(!organization){
            return res.status(404).send({message: 'Organization not found.'});
        }
        let project = new Project(data);
        await project.save();
        return res.send({message: '¡Anuncio creado satisfactoriamente!', project});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding project.'});
    }
}

exports.getByOrganization = async(req, res)=>{
    try{
        let organization = req.params.id;
        let existOrganization = Organization.findOne({_id: organization});
        if(!existOrganization){
            return res.status(404).send({message: 'Organization not found.'});
        }
        let projects = await Project.find({organization: organization}).populate({path: 'organization', select: 'name description email phone location'});
        return res.send({message: 'Projects found: ', projects});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting projects.'});
    }
}