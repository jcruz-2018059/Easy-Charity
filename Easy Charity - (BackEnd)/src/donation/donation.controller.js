'use strict'

const Donation = require('./donation.model');
const Project = require('../project/project.model');
const { encrypt, validateData, checkPassword } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}

exports.add = async(req, res)=>{
    try{
        let user  = req.user.sub;
        let data = req.body;
        let project = req.params.id;
        let existProject = await Project.findOne({_id: project});
        if(!existProject){
            return res.status(404).send({message: 'Project not found.'});
        }
        let params = {
            amount: data.amount,
            paymentMethod: data.paymentMethod
        }
        let validate = validateData(params);
        if(validate){
            return res.status(400).send({validate});
        }
        if(data.amount <= 0){
            return res.status(400).send({message: 'Debes colocar un monto válido.'});
        }
        data.date = new Date(Date.now()).getTime();
        data.user = user;
        data.project = project;
        await Project.findByIdAndUpdate(
            {_id: project},
            {takings: (existProject.takings + data.amount)},
            {new: true}
        )
        let donation = new Donation(data);
        await donation.save();
        return res.send({message: '¡Donación realizada correctamente!', donation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding donation.'});
    }
}