'use strict'

const coController = require('./co.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth, isAdmin, isOrganizationAdmin} = require('../../services/authenticated');

//publicas
api.get('/', coController.test);
api.get('/getCoLogut', coController.getOrganitation);

//privadas
api.post('/addCo', [ensureAuth, isAdmin], coController.addOrganitation);
api.get('/get/:id', coController.getOrganitationById);
api.get('/getCo', [ensureAuth, isOrganizationAdmin], coController.getOrganitationAdmin);
api.delete('/deleteCo/:id', [ensureAuth, isOrganizationAdmin], coController.deleteOrganization);
api.put('/updateOrganization/:id', [ensureAuth, isOrganizationAdmin], coController.updateOrganization);

module.exports = api;