'use strict'

const User = require('./user.model');
const Volunteer = require('../volunteering/volunteering.model')
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

exports.defaultOrAdmin = async()=>{
    try{
        let defAdmin = {
            name: 'Default',
            surname: 'Default',
            username: 'default',
            password: 'none',
            email: 'Oradmin@easy.charity.gt',
            phone: '+502 0000 0000',
            role: 'ORGANIZATION ADMIN'
        }
        let existAdministrator = await User.findOne({username: 'default'});
        if(existAdministrator){
            return console.log('Default OrAdmin is already created.');
        }
        defAdmin.password = await encrypt(defAdmin.password);
        let createDefaultAdmin = new User(defAdmin);
        await createDefaultAdmin.save();
        return console.log('Default OrAdmin created.');
    }catch(err){
        console.error(err);
    }
}

exports.defaultClient = async () => {
    try {
        let defClient = {
            name: 'Default',
            surname: 'Client',
            username: 'defaultclient',
            password: 'none',
            email: 'defaultclient@easy.charity.gt',
            phone: '+502 0000 0000',
            role: 'CLIENT'
        }

        // Verificar si el cliente por defecto ya existe
        let existClient = await User.findOne({ username: 'defaultclient' });
        if (existClient) {
            return console.log('Default client is already created.');
        }

        // Encriptar la contraseña (si tienes una función "encrypt" que funciona correctamente)
        defClient.password = await encrypt(defClient.password);

        // Crear el cliente por defecto
        let createDefaultClient = new User(defClient);
        await createDefaultClient.save();

        return console.log('Default client created.');
    } catch (err) {
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

exports.get = async (req, res) => {
    try {
        // Buscar todos los usuarios excepto aquellos cuyo nombre de usuario sea "default" o "defaultclient"
        let users = await User.find({ username: { $nin: ['default', 'defaultclient'] } })
            .select('name surname username email phone role');

        return res.send({ message: 'Users found: ', users });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting users.' });
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

exports.getAdminUsersExceptGeneral = async (req, res) => {
    try {
      const users = await User.find({ role: 'ADMIN', name: { $ne: 'General' } }).select('name surname');
      return res.send({ message: 'Admin users found:', users });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error getting admin users.' });
    }
  };

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

exports.registerAdmin = async (req, res) => {
    try {
      let data = req.body;
      let params = {
        name: data.name,
        surname: data.surname,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone
      };
  
      let validate = validateData(params);
      if (validate) {
        return res.status(400).send({ validate });
      }
  
      data.role = 'ADMIN'; // Set the role to 'ADMIN' for administrators
      let existUsername = await User.findOne({ username: data.username });
      if (existUsername) {
        return res.status(400).send({ message: 'El username ya está en uso.' });
      }
  
      data.password = await encrypt(data.password);
      let user = new User(data);
      await user.save();
  
      return res.send({ message: '¡Registro satisfactorio! ', user });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error registering admin.' });
    }
  };
  
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

exports.delete = async (req, res) => {
    try {
        let user = req.user.sub;
        let username = req.user.username;
        if (username === 'admin' || req.user.role === 'ORGANIZATION ADMIN') {
            return res.status(401).send({ message: 'Not authorized.' });
        }

        // Obtener el cliente por defecto
        let defaultClient = await User.findOne({ username: 'defaultclient' });
        if (!defaultClient) {
            defaultClient = await User.findOne({ username: 'defaultclient' });
        }

        // Obtener todos los voluntariados asociados al usuario que se va a eliminar
        let volunteerIDs = (await Volunteer.find({ user: user })).map(volunteer => volunteer._id);

        // Actualizar la referencia del usuario por defecto en todos los voluntariados
        await Volunteer.updateMany({ _id: { $in: volunteerIDs } }, { $set: { user: defaultClient._id } });

        // Eliminar el usuario
        let deletedUser = await User.findByIdAndDelete(user);
        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found and not deleted.' });
        }

        return res.send({ message: 'Cuenta eliminada satisfactoriamente.', deletedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting user.' });
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