'use strict'

const volunteeringController = require('./volunteering.controller');
const express = require('express');
const api = express.Router();

api.get('/', volunteeringController.test);










module.exports = api;