'use strict'

const coController = require('./co.controller');
const express = require('express');
const api = express.Router();

api.get('/', coController.test);





module.exports = api;