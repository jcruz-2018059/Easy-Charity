'use strict'

const volunteeringController = require('./volunteering.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth, isClient} = require('../../services/authenticated');

api.get('/', volunteeringController.test);
api.post('/add', [ensureAuth, isClient], volunteeringController.addVolunteering);
api.get('/get', volunteeringController.getVolunteering);
api.put('/cancelVol/:id', [ensureAuth, isClient], volunteeringController.cancel);
api.delete('/deleteVol/:id',[ensureAuth,isClient],volunteeringController.deleteVolunteering );
api.put('/updateVol/:id',[ensureAuth, isClient],volunteeringController.updateVolunteering)
api.get('/getByLoggedUser', ensureAuth, volunteeringController.getVolunteeringByLoggedUser)
api.get('/getById/:id', ensureAuth, volunteeringController.getVolunterById)









module.exports = api;