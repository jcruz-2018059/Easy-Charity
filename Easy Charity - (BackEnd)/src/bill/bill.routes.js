'use strict'
//Importar los modelos
const billController = require('../bill/bill.controller')
const express = require('express');
const api = express.Router();
const {ensureAuth, isClient} = require('../../services/authenticated');

//Rutas del Ciente
api.get('/', billController.test);
api.post('/buy', [ensureAuth, isClient] , billController.buy);
api.get('/getBills', [ensureAuth, isClient],billController.getBills);
api.get('/getBillsLogged', [ensureAuth], billController.getLogged);
api.get('/getBillByDonation/:id', ensureAuth, billController.getBillsByDonation)





module.exports = api;
