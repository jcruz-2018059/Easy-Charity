'use strict'

const express = require('express');
const api = express.Router();
const projectController = require('./project.controller');
const { ensureAuth, isAdmin, isClient, isOrganizationAdmin } = require('../../services/authenticated');

//Funciones generales
api.get('/', projectController.test);

module.exports = api;