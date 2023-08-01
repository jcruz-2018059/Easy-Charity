'use strict';

// Importación de módulos y funciones necesarias
const Project = require('./project.model');
const Organization = require('../charity organization/co.model');
const CharityOrganization = require('../charity organization/co.model');
const Donation = require('../donation/donation.model');
const Volunteer = require('../volunteering/volunteering.model');
const { encrypt, validateData, checkPassword } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

// Función de prueba
exports.test = (req, res) => {
    return res.send({ message: 'Test function is running :)' });
}

// Agregar un nuevo proyecto
exports.add = async (req, res) => {
    try {
        let data = req.body;
        let userId = req.user.sub;

        // Obtener la organización del usuario actual
        let organization = await Organization.findOne({ user: userId });

        // Parámetros del nuevo proyecto
        let params = {
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            budget: data.budget,
            type: data.type,
            organization: organization._id
        }

        // Validación de datos del proyecto
        let validate = validateData(params);
        if (validate) {
            return res.status(400).send({ validate });
        }

        // Validar las fechas del proyecto
        if (new Date(data.startDate).getTime() < new Date(Date.now()).getTime()) {
            return res.status(400).send({ message: 'La fecha de inicio no puede ser antes que hoy.' });
        }
        if (new Date(data.endDate).getTime() <= new Date(Date.now()).getTime()) {
            return res.status(400).send({ message: 'La fecha de finalización no puede ser antes que hoy.' });
        }
        if (data.startDate > data.endDate) {
            return res.status(400).send({ message: 'La fecha de inicio no puede ser después de la de finalización.' });
        }

        // Validar el presupuesto del proyecto
        if (data.budget <= 0) {
            return res.status(400).send({ message: 'Debes colocar un presupuesto válido.' });
        }

        // Establecer las ganancias iniciales del proyecto como 0
        data.takings = 0;

        // Obtener la organización por su ID
        let organizations = await Organization.findOne({ _id: organization._id });
        if (!organizations) {
            return res.status(404).send({ message: 'Organization not found.' });
        }

        // Crear y guardar el nuevo proyecto en la base de datos
        let project = new Project(params);
        await project.save();

        return res.send({ message: '¡Anuncio creado satisfactoriamente!', project });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding project.' });
    }
}

exports.addDefaultProject = async () => {
    try {
        // Verificar si el proyecto por defecto ya existe
        let defaultProject = await Project.findOne({ name: 'Default Project' });
        if (defaultProject) {
            return console.log('Default project already created.');
        }

        // Obtener la organización por defecto
        let defaultOrganization = await CharityOrganization.findOne({ name: 'Default Charity' });
        if (!defaultOrganization) {
            defaultOrganization = await CharityOrganization.findOne({ name: 'Default Charity' });
        }

        // Datos del proyecto por defecto
        let projectData = {
            name: 'Default Project',
            description: 'This is the default project for the default organization.',
            startDate: new Date(),
            endDate: new Date(),
            budget: 0,
            type: 'caridad',
            organization: defaultOrganization._id
        };

        // Crear el proyecto por defecto
        let project = new Project(projectData);
        await project.save();

        return console.log('Default project created.');
    } catch (err) {
        console.error(err);
        return 'Error creating default project.';
    }
}

exports.get = async (req, res) => {
    try {
        // Obtener la organización por defecto
        let defaultOrganization = await CharityOrganization.findOne({ name: 'Default Charity' });

        // Buscar todos los proyectos que NO tengan como organización la organización por defecto
        let projects = await Project.find({ organization: { $ne: defaultOrganization._id } }).populate({
            path: 'organization',
            select: 'name description email phone location'
        });

        return res.send({ message: 'Projects found: ', projects });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting projects.' });
    }
}

// Obtener proyectos por organización
exports.getByOrganization = async (req, res) => {
    try {
        let organization = req.params.id;

        // Verificar si la organización existe
        let existOrganization = Organization.findOne({ _id: organization });
        if (!existOrganization) {
            return res.status(404).send({ message: 'Organization not found.' });
        }

        // Obtener proyectos filtrados por la organización y obtener también el nombre de la organización
        let projects = await Project.find({ organization: organization }).populate({ path: 'organization', select: 'name description email phone location' });
        let organizationName = await Organization.findOne({ _id: organization }).select('name');

        return res.send({ message: 'Projects found: ', projects, organizationName });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting projects.' });
    }
}

// Obtener proyectos por tipo
exports.getByType = async (req, res) => {
    try {
        let type = req.params.type;

        // Obtener proyectos filtrados por el tipo y obtener sus organizaciones asociadas
        let projects = await Project.find({ type: type }).populate({ path: 'organization', select: 'name description email phone location' });
        if (!projects) {
            return res.status(404).send({ message: 'Projects not found.' });
        }

        return res.send({ message: 'Projects found: ', projects });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting projects.' });
    }
}

// Actualizar un proyecto existente
exports.update = async (req, res) => {
    try {
        let user = req.user.sub;
        let data = req.body;
        let project = req.params.id;

        // Obtener la organización administrada por el usuario actual
        let organizationAdmin = await Organization.findOne({ user: user });
        let ownProject = await Project.findOne({ organization: Object(organizationAdmin._id).valueOf() });

        // Verificar si el proyecto pertenece a la organización del usuario actual
        if (!ownProject) {
            return res.status(400).send({ message: 'Not authorized.' });
        }

        // Verificar si el usuario está intentando actualizar datos no permitidos
        if (Object.entries(data).length === 0 || data.organization || data.takings) {
            return res.status(400).send({ message: 'Data cannot be updated.' });
        }

        // Validar las fechas actualizadas del proyecto
        if (data.startDate && !data.endDate) {
            if (new Date(data.startDate).getTime() < new Date(Date.now()).getTime()) {
                return res.status(400).send({ message: 'La fecha de inicio no puede ser antes que hoy.' });
            }
        }
        if (data.endDate && !data.startDate) {
            if (new Date(data.endDate).getTime() <= new Date(Date.now()).getTime()) {
                return res.status(400).send({ message: 'La fecha de finalización no puede ser antes que hoy.' });
            }
        }
        if (data.startDate && data.endDate) {
            if (data.startDate > data.endDate) {
                return res.status(400).send({ message: 'La fecha de inicio no puede ser después de la de finalización.' });
            }
        }

        // Validar el presupuesto actualizado del proyecto
        if (data.budget) {
            if (data.budget <= 0) {
                return res.status(400).send({ message: 'Debes colocar un presupuesto válido.' });
            }
        }

        // Actualizar el proyecto en la base de datos y obtener el proyecto actualizado
        let updatedProject = await Project.findOneAndUpdate(
            { _id: project },
            data,
            { new: true }
        ).populate({ path: 'organization', select: 'name description email phone location' });

        if (!updatedProject) {
            return res.status(404).send({ message: 'Project not found and not updated.' });
        }

        return res.send({ message: '¡Anuncio actualizado correctamente!', updatedProject });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating project.' });
    }
}

exports.delete = async (req, res) => {
    try {
        let user = req.user.sub;
        let projectID = req.params.id;
        let organizationAdmin = await Organization.findOne({ user: user });
        let ownProject = await Project.findOne({ organization: Object(organizationAdmin._id).valueOf() });
        if (!ownProject) {
            return res.status(400).send({ message: 'Not authorized.' });
        }

        // Obtener el proyecto por defecto
        let defaultProject = await Project.findOne({ name: 'Default Project' });
        if (!defaultProject) {
            defaultProject = await addDefaultProject();
        }

        // Actualizar el estado de los voluntariados asociados al proyecto que se va a eliminar
        await Volunteer.updateMany({ proyect: projectID }, { $set: { state: false } });

        // Actualizar todas las donaciones asociadas al proyecto que se va a eliminar
        await Donation.updateMany({ project: projectID }, { $set: { project: defaultProject._id } });

        // Actualizar todos los voluntariados asociados al proyecto que se va a eliminar
        await Volunteer.updateMany({ proyect: projectID }, { $set: { proyect: defaultProject._id } });

        // Eliminar el proyecto original
        let deletedProject = await Project.findByIdAndDelete(projectID);
        if (!deletedProject) {
            return res.status(404).send({ message: 'Project not found and not updated.' });
        }

        return res.send({ message: 'Anuncio eliminado correctamente.', deletedProject });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting project.' });
    }
}

// Obtener proyectos asociados al usuario actual
exports.getByLoggedUser = async (req, res) => {
    try {
        let userId = req.user.sub;

        // Obtener la organización del usuario actual
        let organization = await Organization.findOne({ user: userId });
        let organizationName = organization.name;

        if (!organization) {
            return res.status(400).send({ message: 'Not found' });
        }

        // Obtener proyectos filtrados por la organización y obtener también el nombre de la organización
        let projects = await Project.find({ organization: organization._id }).populate({ path: 'organization', select: 'name description email phone location' });

        if (!projects) {
            return res.status(400).send({ message: 'Proyects Not found' });
        }

        return res.send({ message: 'Proyects found', projects, organizationName })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting proyect' })
    }
}

// Obtener un proyecto por su ID
exports.getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;

        // Obtener el proyecto por su ID y obtener también la organización asociada
        const project = await Project.findById(projectId);
        const organization = await Organization.findById(project.organization);

        if (!project) {
            return res.status(404).send({ message: 'Proyecto no encontrado.' });
        }

        return res.send({ message: 'Proyecto encontrado:', project, organization });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error obteniendo el proyecto.' });
    }
}
