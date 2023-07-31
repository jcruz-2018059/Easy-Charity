
const billController = require('./bill.controller')
const express = require('express');
const api = express.Router();
const {ensureAuth, isClient} = require('../../services/authenticated');


api.get('/', billController.test);
api.post('/buy', [ensureAuth, isClient] , billController.buy);
api.get('/getBills', [ensureAuth, isClient],billController.getBills);
api.get('/getBillsLogged', [ensureAuth], billController.getLogged);





module.exports = api;
