'use strict';

// Importación de módulos y funciones necesarias
const Donation = require('./donation.model');
const User = require('../user/user.model');
const Project = require('../project/project.model');
const Organization = require('../charity organization/co.model');
const { encrypt, validateData, checkPassword } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');
const Bill = require('../bill/bill.model');

// Función de prueba
exports.test = (req, res) => {
    return res.send({ message: 'Test function is running :)' });
}

// Agregar una nueva donación a un proyecto
exports.add = async (req, res) => {
    try {
        let user = req.user.sub;
        let data = req.body;
        let project = req.params.id;

        // Verificar si el proyecto existe
        let existProject = await Project.findOne({ _id: project });
        if (!existProject) {
            return res.status(404).send({ message: 'Project not found.' });
        }

        let params = {
            amount: data.amount,
            paymentMethod: data.paymentMethod
        };

        // Validar los datos de la donación
        let validate = validateData(params);
        if (validate) {
            return res.status(400).send({ validate });
        }

        if (data.amount <= 0) {
            return res.status(400).send({ message: 'Debes colocar un monto válido.' });
        }

        // Establecer la fecha de la donación como el tiempo actual en milisegundos
        data.date = new Date(Date.now()).getTime();
        data.user = user;
        data.project = project;

        // Actualizar el total de recaudación del proyecto con el monto de la donación
        await Project.findByIdAndUpdate(
            { _id: project },
            { takings: (existProject.takings + Number(data.amount)) },
            { new: true }
        );

        // Crear y guardar la nueva donación en la base de datos
        let donation = new Donation(data);
        await donation.save();

        // Obtener el usuario logeado
        let userLogged = await User.findOne({ _id: user });

        // Crear y guardar la factura con el ID de la donación
        let billParams = {
            name: userLogged.name,
            surname: userLogged.surname,
            date: new Date(Date.now()).getTime(),
            donation: donation._id, // Almacenar el ID de la donación creada en la factura
            total: donation.amount
        };

        let bill = new Bill(billParams);
        await bill.save();

        return res.send({ message: '¡Donación realizada correctamente!', donation });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding donation.' });
    }
};

// Obtener todas las donaciones de un usuario organización
exports.get = async (req, res) => {
    try {
        let user = req.user.sub;
        let organization = await Organization.findOne({ user: user });
        let projects = await Project.find({ organization: Object(organization._id).valueOf() });
        let donations = [];

        // Obtener todas las donaciones de los proyectos de la organización
        await Promise.all(projects.map(async (project) => {
            let donation = await Donation.find({ project: Object(project._id).valueOf() })
                .populate({ path: 'project', select: 'name description startDate endDate type organization', populate: { path: 'organization', select: 'name' } });
            donations.push(donation);
        }));

        // Calcular el total de donaciones
        let total = 0;
        donations.forEach(donation => {
            donation.forEach(element => {
                total = total + element.amount;
            });
        });

        return res.send({ message: 'Donations found: ', donations, total });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting donations.' });
    }
}

// Obtener todas las donaciones realizadas por un usuario
exports.getByUser = async (req, res) => {
    try {
        let user = req.user.sub;

        // Obtener todas las donaciones realizadas por el usuario
        let donations = await Donation.find({ user: user })
            .select('amount date description paymentMethod project')
            .populate({ path: 'project', select: 'name description startDate endDate type organization', populate: { path: 'organization', select: 'name' } });

        if (!donations) {
            return res.status(404).send({ message: 'Donations not found.' });
        }

        // Calcular el total de donaciones realizadas por el usuario
        let total = 0;
        donations.forEach(donation => {
            total = total + donation.amount;
        });

        return res.send({ message: 'Donations found: ', donations, total });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting donations.' });
    }
}
