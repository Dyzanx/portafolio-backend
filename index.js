'use strict'

var app = require('./app');
var port = 9000;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/Portafolio')
        .then(() => {
            console.log('conexion exitosa');

        // Creacion del servidor
            app.listen(port, () => {
                console.log('Servidor corriendo en la URL: http://localhost:9000/api');
            });

        })
        .catch(err => console.log(err));