
const billController = require('./bill.controller')
const express = require('express');
const api = express.Router();
const {ensureAuth, isClient} = require('../../services/authenticated');


api.get('/', billController.test);
api.post('/buy', [ensureAuth, isClient] , billController.buy);





module.exports = api;
