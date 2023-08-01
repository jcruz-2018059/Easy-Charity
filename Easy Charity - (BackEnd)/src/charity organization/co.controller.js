'use strict'

const CharityOrganization = require('./co.model');
const User = require('../user/user.model');
const Project = require('../project/project.model')

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
        if(!roleUpdate) return res.status(404).send({message: 'Usuario no encontrado, no se actualizó el rol.'});
        return res.send({message: 'Organización agregada satisfactoriamente.', organitation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al agregar una organizacion', error: err.message});
    }
}

exports.createDefaultOrganization = async () => {
    try {
        let user = await User.findOne({username: 'default'})
        let defOrganization = {
            name: 'Default Charity',
            description: 'default',
            email: 'defaul@easycharity.com',
            phone: '0000 0000',
            location: 'none',
            user: user._id
            // Otros parámetros que desees establecer por defecto para la organización
        };

        let existOrganization = await CharityOrganization.findOne({ name: 'Default Charity' });
        if (existOrganization) {
            return console.log('Default organization is already created.');
        }

        let createDefaultOrganization = new CharityOrganization(defOrganization);
        await createDefaultOrganization.save();
        return console.log('Default organization created.');
    } catch (err) {
        console.error(err);
    }
}

//Publica para mostrar todas las organizaciones
exports.getOrganitation = async (req, res) => {
    try {
        // Obtener la organización por defecto
        let defaultOrganization = await CharityOrganization.findOne({ name: 'Default Charity' });

        // Buscar todas las organizaciones excepto la organización por defecto
        let organizations = await CharityOrganization.find({ _id: { $ne: defaultOrganization._id } }).populate('user');

        return res.send({ organizations });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al traer las organizaciones', error: err.message });
    }
}

//Privado 
exports.getOrganitationAdmin = async(req,res)=>{
    try{
        //Se trae el token
        let user = req.user.sub;
        let organization = await CharityOrganization.findOne({user}).populate('user');
        return res.send({message: 'found', organization});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer las organizaciones', error: err.message});
    }
}
exports.getOrganitationById = async(req,res)=>{
    try{
        let organitation = req.params.id;
        let organization = await CharityOrganization.findOne({_id: organitation});
        return res.send({message: 'found', organization});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer laa organización.', error: err.message});
    }
}

//Eliminar la Organizacion
exports.deleteOrganization = async (req, res) => {
    try {
        // Trae el token
        let user = req.user.sub;

        // Traemos el Id de la Organizacion
        let organizationID = req.params.id;
        let organization = await CharityOrganization.findOne({ _id: organizationID });

        // Se valida que no pueda eliminar la organizacion de otro Administrador
        if (user != organization.user) return res.send({ message: 'No puedes Eliminar la organizacion de otro Administrador de Organizacion' });

        // Obtener la organización por defecto
        let defaultOrganization = await CharityOrganization.findOne({ name: 'Default Charity' });
        if (!defaultOrganization) {
            defaultOrganization = await CharityOrganization.findOne({ name: 'Default Charity' });
        }

        // Actualizar todos los proyectos asociados a la organización que se va a eliminar
        await Project.updateMany({ organization: organizationID }, { $set: { organization: defaultOrganization._id } });

        // Elimina la organizacion
        let deleteOrganization = await CharityOrganization.findOneAndRemove({ _id: organization._id });
        if (!deleteOrganization) return res.status(404).send({ message: 'Organizacion no encontrada, no se pudo eliminar' });

        await User.findOneAndUpdate(
            { _id: user },
            { role: 'ADMIN' },
            { new: true }
        );

        return res.send({ message: 'Organizacion eliminada y proyectos asociados actualizados', deleteOrganization });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al tratar de Eliminar la Organizacion', error: err.message });
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


        let organization = await CharityOrganization.findOne({_id: organizationID});

        if(user !== Object(organization.user).valueOf()) return res.status(400).send({message: 'No puedes editar la organizacion de otro Administrador de Organizacion'});

        let updateOrganization = await CharityOrganization.findOneAndUpdate(
            {_id: organization._id},
            data,
            {new: true}
        );
        if(!updateOrganization) return res.status(404).send({message: 'Organizacion no encontrada, no se pudo actualizar la Organizacion'});
        return res.send({message: '¡Organización actualizada correctamente!', updateOrganization});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al Actualizar la Organizacion', error: err.message});
    }
}