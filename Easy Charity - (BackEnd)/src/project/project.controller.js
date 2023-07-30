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

exports.get = async(req, res)=>{
    try{
        let projects = await Project.find({}).populate({path: 'organization', select: 'name description email phone location'});
        return res.send({message: 'Projects found: ', projects});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting projects.'});
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
        let organizationName = await Organization.findOne({_id: organization}).select('name');
        return res.send({message: 'Projects found: ', projects, organizationName});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting projects.'});
    }
}

exports.getByType = async(req, res)=>{
    try{
        let type = req.params.type;
        let projects = await Project.find({type: type}).populate({path: 'organization', select: 'name description email phone location'});
        if(!projects){
            return res.status(404).send({message: 'Projects not found.'});
        }
        return res.send({message: 'Projects found: ', projects});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting projects.'});
    }
}

exports.update = async(req, res)=>{
    try{
        let user = req.user.sub;
        let data = req.body;
        let project = req.params.id;
        let organizationAdmin = await Organization.findOne({user: user});
        let ownProject = await Project.findOne({organization: Object(organizationAdmin._id).valueOf()});
        if(!ownProject){
            return res.status(400).send({message: 'Not authorized.'});
        }
        if(Object.entries(data).length === 0 || data.organization || data.takings){
            return res.status(400).send({message: 'Data cannot be updated.'});
        }
        if(data.startDate && !data.endDate){
            if(new Date(data.startDate).getTime() < new Date(Date.now()).getTime()){
                return res.status(400).send({message: 'La fecha de inicio no puede ser antes que hoy.'});
            }
        }
        if(data.endDate && !data.startDate){
            if(new Date(data.endDate).getTime() <= new Date(Date.now()).getTime()){
                return res.status(400).send({message: 'La fecha de finalización no puede ser antes que hoy.'});
            }
        }
        if(data.startDate && data.endDate){
            if(data.startDate > data.endDate){
                return res.status(400).send({message: 'La fecha de inicio no puede ser después de la de finalización.'});
            }
        }
        if(data.budget){
            if(data.budget <= 0){
                return res.status(400).send({message: 'Debes colocar un presupuesto válido.'});
            }
        }
        let updatedProject = await Project.findOneAndUpdate(
            {_id: project},
            data,
            {new: true}
        ).populate({path: 'organization', select: 'name description email phone location'});
        if(!updatedProject){
            return res.status(404).send({message: 'Project not found and not updated.'});
        }
        return res.send({message: '¡Anuncio actualizado correctamente!', updatedProject});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating project.'});
    }
}

exports.delete = async(req, res)=>{
    try{
        let user = req.user.sub;
        let project = req.params.id;
        let organizationAdmin = await Organization.findOne({user: user});
        let ownProject = await Project.findOne({organization: Object(organizationAdmin._id).valueOf()});
        if(!ownProject){
            return res.status(400).send({message: 'Not authorized.'});
        }
        let deletedProject = await Project.findByIdAndDelete({_id: project});
        if(!deletedProject){
            return res.status(404).send({message: 'Project not found and not updated.'});
        }
        return res.send({message: 'Anuncio eliminado correctamente.', deletedProject});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting project.'});
    }
}