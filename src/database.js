//Archivo que conecta a base de datos y luego utilizo en index.js

const mongoose = require ('mongoose');
    //MONGO DB ATLAS, DAN URL PARA CONECTARSE A LA BASE DE DATOS EN LA NUBE (En este caso usamos DB Local)

const URI = 'mongodb://localhost/MERN-CRUD';

//Incializo mongod en una nueva terminal 
mongoose.connect(URI) //Funcion que conecta mongoose a una database (creada o la crea)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose; 
