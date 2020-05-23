//define las operaciones a traves de las url que vamos a dar en servidor
//url para que una persona pueda hacer CRUD
const express = require('express');
const router = express.Router();

const Task = require('../models/task');

//rest api son direcciones de internet donde app de react puede hacer peticiones y hacer CRUD
router.get('/', async (req, res) => { 
    const tasks = await Task.find(); //esto busca una coleccion "Task" en la base de datos   
    res.json(tasks);
});

router.get('/id', async (req, res) => { //busca un parametro por su id
    const task = await Task.findById(req.params.id); //busca la propiedad de un elemento por su id (dentro de una coleccion, dentro de un objeto con determinado id)
    res.json(task); //devuelve este objeto mismo objeto en json
});


router.post('/', async(req, res) =>{
    const { tittle, description } = req.body; 
    const task = new Task({tittle, description});
    await task.save(); //guarda la tarea en DB y crea la base
    res.json({status: 'Task Saved'});
 
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