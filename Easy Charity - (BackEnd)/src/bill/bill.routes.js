
const billController = require('./bill.controller')
const express = require('express');
const api = express.Router();


api.get('/', billController.test)





module.exports = api;
