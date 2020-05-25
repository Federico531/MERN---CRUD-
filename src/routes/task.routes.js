//define las operaciones a traves de las url que vamos a dar en servidor
//url para que una persona pueda hacer CRUD
const express = require('express');
const router = express.Router();
//A TRAVES DE RES.JSON NOS COMUNICAMOS CON REACT
const Task = require('../models/task');

//rest api son direcciones de internet donde app de react puede hacer peticiones y hacer CRUD

//Muestra todos los objetos json en la coleccion task
router.get('/', async (req, res) => { 
    const tasks = await Task.find(); //esto busca una coleccion "Task" en la base de datos   
    res.json(tasks); 
});

//muestra solo un objeto de la coleccion por su propiedad id
router.get('/:id', async (req, res) => { //busca un unico parametro por su id
    const task = await Task.findById(req.params.id); //busca la propiedad de un elemento por su id (dentro de una coleccion, dentro de un objeto con determinado id)
    res.json(task); //devuelve este objeto mismo objeto en json
});


router.post('/', async(req, res) =>{  
    const { tittle, description } = req.body; //extraigo estas dos propiedades de lo que recibo del navegador 
    const task = new Task({tittle, description}); //creo un objeto con estos dos parametros
    await task.save(); //guarda la tarea en DB y crea la base
    res.json({status: 'TAREA GUARDADA'}); //A traves de esta respuesta json se comunican las rutas de EXPERSS con REACT
    //TAREA GUARDADA VA A SER EL MENSJE QUE VAMOS A DEVOLVER UNA VEZ ESTE METODO HAYA CONCLUIDO
 
});


router.put('/:id', async (req, res) => {
    const { tittle, description } = req.body; 
    const newTask = { tittle, description};
    await Task.findByIdAndUpdate(req.params.id, newTask); 
    res.json({status: 'Task Updated'});
});

router.delete('/:id', async (req, res)=>{
   // const { tittle, description } = req.body; 
    //const newTask = { tittle, description};
    await Task.findByIdAndDelete(req.params.id); 
    res.json({status: 'Task Deleted'});
})



module.exports = router;