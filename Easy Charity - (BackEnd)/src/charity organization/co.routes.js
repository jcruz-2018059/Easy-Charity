'use strict'

const coController = require('./co.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth, isAdmin} = require('../../services/authenticated');

api.get('/', coController.test);
api.post('/addCo', [ensureAuth, isAdmin], coController.addOrganitation);




module.exports = api;