//encargado de enviar archivos al navegador 

const express = require ('express');
const morgan = require ('morgan')
const app = express();
const path = require('path'); //unifica los directorios /  \ y hace multiplataforma (windows linux)
const { mongoose }  = require('./database') //no importa mongoose, solo solicita el modulo que exporta database.js

//Settings

app.set('port', process.env.PORT || 3000); //El puerto de mi aplicacion en el sistema operativo o la nube, o puesto 3000 por defecto


//MiddleWares
app.use(morgan('dev')); //nos devuelve por consola informacion sobre cualquier evento CRUD
app.use(express.json()); 
//traduce los datos que ingresan al servidor desde react, a JSON ya que es el formato en comun en el que se comunican


//Routes
//En resumen es como un prefijo que le agrega de por si a esta ruta especifica
app.use('/api/tasks', require('./routes/task.routes'));//task.routes, estas rutas llevaran el prefijo
     //  ('/api/tasks/', require) //luego del index a estas rutas les agrega el sufixo /api/tasks (o sea que tasks routes podria ser api tasks)
                       // prefijo, te redirecciona directo del index?


//Static files    

//(Donde iran mis JS, HTML, JAVASCRIPT) --> PUBLIC
//Hace visible la carpeta PUBLIC desde cualqier parte de SRC
app.use(express.static(path.join(__dirname, '/public'))); 
// Express.mi carpeta static esta (en esta direccion);  
//encuentra primero index.html
// C:\Users\Fede\Desktop\PROGRAMACION\JAVASCRIPT\Cursos\MERN-CRUD-TASKS-1\src + public
// path une directorio / \ para multiplataforma (linux, windows)


//Starting the server
app.listen(app.get('port'), ()=>{
    console.log("Servidor en puerto ", app.get('port'), 
                    `Server on port ${app.get('port')}`)
});