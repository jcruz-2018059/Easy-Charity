'use strict'

const express = require('express');
const api = express.Router();
const donationController = require('./donation.controller');
const { ensureAuth, isAdmin, isClient, isOrganizationAdmin } = require('../../services/authenticated');

//Funciones generales
api.get('/', donationController.test);

//Funciones de client
api.post('/add/:id', [ensureAuth, isClient], donationController.add);

module.exports = api;