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
//rutas de donation
//rutas de project
//rutas de user
//rutas de volunteering

//Configurar el servidor de express
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas de cada colección 
//rutas de colección de bill
//rutas de colección de charityDonation
//rutas de colección de donation
//rutas de colección de project
//rutas de colección de user
//rutas de colección de volunteering

//Función para levantar el puerto
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}