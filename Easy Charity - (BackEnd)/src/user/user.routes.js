'use strict'

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const { ensureAuth, isAdmin, isClient, isOrganizationAdmin } = require('../../services/authenticated');

//Funciones generales
api.get('/', userController.test);
api.post('/login', userController.login);
api.post('/register', userController.register);
api.get('/account', ensureAuth, userController.account);

//Funciones de usuario
api.put('/update', ensureAuth, userController.update);
api.delete('/delete', ensureAuth, userController.delete);

//Funciones de admin
api.get('/get', [ensureAuth, isAdmin], userController.get);

module.exports = api;