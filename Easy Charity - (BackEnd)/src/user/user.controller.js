'use strict'

const User = require('./user.model');
const { encrypt, validateData, checkPassword } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}

exports.default = async()=>{
    try{
        let defAdmin = {
            name: 'General',
            surname: 'Administrator',
            username: 'admin',
            password: 'admin',
            email: 'admin@easy.charity.gt',
            phone: '+502 5897 2145',
            role: 'ADMIN'
        }
        let existAdministrator = await User.findOne({username: 'admin'});
        if(existAdministrator){
            return console.log('Default admin is already created.');
        }
        defAdmin.password = await encrypt(defAdmin.password);
        let createDefaultAdmin = new User(defAdmin);
        await createDefaultAdmin.save();
        return console.log('Default administrator created.');
    }catch(err){
        console.error(err);
    }
}

exports.login = async(req, res)=>{
    try{
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        }
        let validate = validateData(credentials);
        if(validate){
            return res.status(400).send({validate});
        }
        let user = await User.findOne({username: data.username})
        if(user && await checkPassword(data.password, user.password)){
            let token = await createToken(user);
            let userLogged = {
                username: user.username,
                name: user.name,
                role: user.role,
                id: user._id
            }
            return res.send({message: 'Usuario logeado satisfactoriamente.', token, userLogged});
        }
        return res.status(404).send({message: 'Credenciales inválidas.'})

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error logging.'});
    }
}

exports.get = async(req, res)=>{
    try{
        let users = await User.find().select('name surname username email phone role');
        return res.send({message: 'Users found: ', users});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting users.'});
    }
}

exports.getUsers = async(req, res)=>{
    try{
        let users = await User.find({role: 'CLIENT'}).select('name surname');
        return res.send({message: 'Users found: ', users});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting users.'});
    }
}

exports.getUser = async(req, res)=>{
    try{
        let userId = req.params.id;
        let user = await User.findOne({_id: userId}).select('name surname username email phone');
        return res.send({message: 'User found: ', user});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting user.'});
    }
}

exports.account = async(req, res)=>{
    try{
        let userId = req.user.sub;
        let user = await User.findOne({_id: userId}).select('name surname username email phone role');
        return res.send({message: 'User found: ', user});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting users.'});
    }
}

exports.register = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name,
            surname: data.surname,
            username: data.username,
            password: data.password,
            email: data.email,
            phone: data.phone
        } 
        let validate = validateData(params);
        if(validate){
            return res.status(400).send({validate});
        }
        data.role = 'CLIENT';
        let existUsername = await User.findOne({username: data.username});
        if(existUsername){
            return res.status(400).send({message: 'El username ya está en uso.'});
        }
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({message: '¡Registro satisfactorio! ', user});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error registering user.'});
    }
}

exports.update = async(req, res)=>{
    try{
        let data = req.body;
        let user = req.user.sub;
        let existUser = await User.findOne({_id: user});
        if(!existUser){
            return res.status(404).send({message: 'User not found.'});
        }
        if(existUser.username === 'admin'){
            return res.status(400).send({message: 'Not authorized.'})
        }
        if(Object.entries(data).length === 0 || data.role || data.password){
            return res.status(400).send({message: 'Alguna información no puede ser actualizada.'});
        }
        if(data.username){
            let existUsername = await User.findOne({username: data.username});
            if(existUsername){
                if(existUsername._id != user){
                    return res.status(400).send({message: 'El username ya está en uso.'});
                }
            }
        }
        let updatedUser = await User.findByIdAndUpdate(
            {_id: user},
            data,
            {new: true}
        ).select('name surname username email phone');
        if(!updatedUser){
            return res.status(404).send({message: 'User not found and not updated.'});
        }
        return res.send({message: '¡Usuario actualizado!', updatedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating user.'});
    }
}

exports.edit = async(req, res)=>{
    try{
        let data = req.body;
        let user = req.params.id;
        let existUser = await User.findOne({_id: user});
        if(!existUser){
            return res.status(404).send({message: 'User not found.'});
        }
        if(existUser.username === 'admin'){
            return res.status(400).send({message: 'Not authorized.'})
        }
        if(Object.entries(data).length === 0 || data.role || data.password){
            return res.status(400).send({message: 'Alguna información no puede ser actualizada.'});
        }
        if(data.username){
            let existUsername = await User.findOne({username: data.username});
            if(existUsername){
                if(existUsername._id != user){
                    return res.status(400).send({message: 'El username ya está en uso.'});
                }
            }
        }
        let updatedUser = await User.findByIdAndUpdate(
            {_id: user},
            data,
            {new: true}
        ).select('name surname username email phone');
        if(!updatedUser){
            return res.status(404).send({message: 'User not found and not updated.'});
        }
        return res.send({message: '¡Usuario actualizado!', updatedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating user.'});
    }
}

exports.delete = async(req, res)=>{
    try{
        let user = req.user.sub;
        let username = req.user.username;
        if(username === 'admin' || user.role === 'ORGANIZATION ADMIN'){
            return res.status(401).send({message: 'Not authorized.'});
        }
        let deletedUser = await User.findOneAndDelete({_id: user});
        if(!deletedUser){
            return res.status(404).send({message:'User not found and not deleted.'});
        }
        return res.send({message: 'Cuenta eliminada satisfactoriamente.', deletedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting user.'});
    }
}

exports.remove = async(req, res)=>{
    try{
        let user = await User.findOne({_id: req.user.sub});
        let userId = req.params.id;
        if(Object(user._id).valueOf() === userId){
            return res.status(401).send({message: 'Not authorized.'});
        }
        let deletedUser = await User.findOneAndDelete({_id: userId});
        if(!deletedUser){
            return res.status(404).send({message:'User not found and not deleted.'});
        }
        return res.send({message: 'Cuenta eliminada satisfactoriamente.', deletedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting user.'});
    }
}