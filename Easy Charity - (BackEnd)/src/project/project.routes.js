'use strict'

const express = require('express');
const api = express.Router();
const projectController = require('./project.controller');
const { ensureAuth, isAdmin, isClient, isOrganizationAdmin } = require('../../services/authenticated');

//Funciones generales
api.get('/', projectController.test);
api.get('/get/:id', projectController.getByOrganization);
api.get('/get', projectController.get);

//Funciones de cliente
api.get('/getByType/:type', [ensureAuth, isClient], projectController.getByType);

//Funciones para organizationAdmin
api.post('/add', [ensureAuth, isOrganizationAdmin], projectController.add);
api.put('/update/:id', [ensureAuth, isOrganizationAdmin], projectController.update);
api.delete('/delete/:id', [ensureAuth, isOrganizationAdmin], projectController.delete);
api.get('/getByLoggedUser', ensureAuth, projectController.getByLoggedUser)

module.exports = api;