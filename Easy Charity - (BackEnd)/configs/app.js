'use strict'

const express = require('express');
//Logs de las solicitudes que reciba el servidor
const morgan = require('morgan');
//Seguridad básica al servidor
const helmet = require('helmet');
//Aceptación de solicitudes desde otro origen o desde la misma máquina
const cors = require('cors');
//Instancia de express
const app = express();
const port = process.env.PORT || 3200;

// Rutas
//rutas de bill
//rutas de charityDonation
const donationRoutes = require('../src/donation/donation.routes');
const projectRoutes = require('../src/project/project.routes');
const userRoutes = require('../src/user/user.routes')
const coRoutes = require('../src/charity organization/co.routes');
const volunteeringRoutes = require('../src/volunteering/volunteering.routes');
const billRoutes = require('../src/bill/bill.routes');
//rutas de volunteering

//Configurar el servidor de express
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas de cada colección 
//rutas de colección de bill
app.use('/bil',billRoutes);
//rutas de colección de charityDonation
app.use('/co',coRoutes);
app.use('/donation', donationRoutes);
app.use('/project', projectRoutes);
app.use('/user', userRoutes);
//rutas de colección de volunteering
app.use('/volunteering', volunteeringRoutes);

//Función para levantar el puerto
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}