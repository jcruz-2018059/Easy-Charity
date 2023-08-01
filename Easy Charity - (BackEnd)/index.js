'use strict'
require('dotenv').config();
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const userController = require('./src/user/user.controller');
const coController = require('./src/charity organization/co.controller');
const projectController = require('./src/project/project.controller')

mongoConfig.connect();
app.initServer();
userController.default();
userController.defaultOrAdmin();
userController.defaultClient();
coController.createDefaultOrganization();
projectController.addDefaultProject();
