import React, { Component } from 'react';

//Componente de TODA nuestra aplicacion
class App1 extends Component {
    constructor(){ // adentro vamos a utilizar las clases que nos da react
        super(); //es una clase de react averiguar para que sirve
        this.state = {
            tittle:'',   //cuando empieza la aplicacion el estado de estas dos propiedades es un string en blanco
            description:'',
            tasks:[], //este array lo llena fetchTasks
            _id: ''
        };   //el estado actual de mi aplicacion 
        this.addTask = this.addTask.bind(this); //sin esto addTask no leia el state dentro del constructor  por tanto no se enviaban objetos desde el formulario 
        this.handleChange= this.handleChange.bind(this);
    }
    
    //Envia los datos a la base y los guarda
    addTask(e){
         //hace una peticion PUT pasandole el id (EDIT)
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, { //recibe los datos de esete id y los coloca en el formulario 
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Accept':'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data));
        M.toast({html: 'Tarea actualizada'});
        this.setState({tittle: '', description: '', _id: ''});
        this.fetchTasks();
        } else {
                //le doy la ruta donde envio los datos
            fetch('api/tasks',{//no hace falta agregar localhost:3000/api/tasks ya que react esta servida por el mismo servidor
                //con que metodo
                method: 'POST',
                //el contenido que envio, en este caso mi estado actual (convertido a JSON) 
                body: JSON.stringify(this.state),
                headers: { //Aclara tipo de contenido y pide que lo acepten
                    'Accept':'application/json',
                    'Content-Type' : 'application/json'
                }
            }) 
            //nos devuelve la respuesta de a que direccion hemos enviado esto y en teoria deberia haber guardado este dato en la base y coleccion correspondiente 
            //estos callbacks los recibo al finalizar la ejecuion de la funcion FETCH
            .then(res => res.json())
            .then(res => console.log(res))
            .then(data => {
                console.log(data)
                M.toast({html:'Guardado'}); //un callback que muestra mensaje momentaneo en pantalla (MATERIALIZE)
                this.setState({tittle: '', description:''}) //limpiamos el status y por tanto el formulario (agregamos value = this.status.tittle/description )
                this.fetchTasks(); //Pide las tareas nuevamente desde el servidor y actualiza las columnas en pantalla
                })
            .catch(err => console.log(err));
        }
        e.preventDefault(); //para que el evento que reciba en submit no me reinice la pagina
    };

    //Borra objeto dentro de la coleccion
    deleteTask(id){ //el parametro es tasks._id --> lo da el boton en on click 
        //para preguntar si queremos eliminar
        if (confirm('Seguro que queres borrar?')){
            fetch(`/api/tasks/${id}`,{
                method: 'DELETE',
                headers: { //Aclara tipo de contenido y pide que lo acepten
                    'Accept':'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json()) //convierte la respuesta que recibe del delete a json
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea eliminada'});
                this.fetchTasks();
            }); //y muestra esa conversion por consola
    
        }
}

  editTask(id) {
    fetch(`/api/tasks/${id}`) 
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ //cambiamos el estado al objeto actual para poder tomarlo
            tittle: data.tittle,
            description: data.description,
            _id: data._id
        })
      });
  }
    //Muy util --> ejecuta las funciones que contiene al ejecutar la ruta
    componentDidMount(){
        this.fetchTasks();  //me muestra por consola un arreglo con los objetos de mi coleccion  
    }

    //Consigue los datos de la base para desplegarlos
    fetchTasks(){
        fetch('/api/tasks')   //no hace falta aclarar el metodo ya que fetch por defecto usa metodo GET
        .then(res => res.json()) //convierto la respuesta de todos los objetos a json
        .then(data => {
            console.log(data) //una vez convertidos los datos quiero verlos por consola 
            this.setState({tasks: data}); //el objeto tareas en status va a contener TODA la coleccion en esta propiedad
            console.log(this.state.tasks) //ESTAS TAREAS PUEDEN SER RECORRIDAS PARA HACERLES RENDER POR PANTALLA
        }); 

    }
        //Captura todos los cambios dentro de un input 
        handleChange(e){
            const { name, value } = e.target; //extraigo el valor del cambio y nombre del objeto que sufrio el cambio.
            this.setState({         //setState cambia el estado de una app de react
                [name]: value  //estoy dando nombre variable con name (la variable tittle o description !!!) y el valor que recibo de target
            }) //name="tittle" viene de la etiqueta que le dimos en input            
        }
        
    render(){
        return(
           <div>
               {/* {NAVIGATION} */}
               <nav className="light-blue darken-4">
                   {/* Centra el contenido de la navegacion */}

                    <div className="container">
                        <a className="brand-logo" href="/">Mern Stack</a>

                    </div>
                {/* MODIFICAR ESTOS OBJETOS A GUSTO */}
               </nav>
               {/* CONTENIDO CENTRADO CON PADDING*/}
               <div className="container">
                   <div className="row"> 
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    {/* FORMULARIO DENTRO DE UN CUADRADO BLANCO DE 5 COLUMNAS */}
                                    <form onSubmit={this.addTask}>
                                        <div className="row"> 
                                            <div className="input-field col s12">
                                                
                                                {/* onChange hace que escuche cada cambio de datos en el campo */}
                                                <input 
                                                name='tittle'
                                                onChange={this.handleChange} 
                                                type="text"
                                                placeholder="Task Tittle " 
                                                value={this.state.tittle}/>

                                                {/* Value -> es el estado de la propiedad actual  */}
                                                <textarea 
                                                name='description' 
                                                onChange={this.handleChange}
                                                placeholder="Task Description" 
                                                className="materialize-textarea" 
                                                value={this.state.description}>
                                                </textarea>

                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                          {/*Esta es la columna de los elementos GET  */}
                        <div className="col s7">
                            <table> 
                                <thead>
                                    <tr>
                                        <th>Tittle</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map( task1 => {
                                            return (
                                                //Cada fila se diferencia (key) por su _id (otorgado por mongo DB)
                                                <tr key={task1._id}>
                                                    {/* El metodo map recorre las tareas una a una y las va desplegando en pantalla en columna */}
                                                    <td>{task1.tittle}</td> 
                                                    <td>{task1.description}</td>
                                                    <td>
                                                          {/* onclick = borra el objeto que tiene el id del parametro de la funcion deleteTask */}
                                                        <button 
                                                        className="btn light-blue darken-4"
                                                        onClick={() => this.deleteTask(task1._id)}>
                                                            {/* Icono del evento tachito de basura*/}
                                                            <i className='material-icons'>delete</i>
                                                        </button>
                                                        <button onClick={()=>this.editTask(task1._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                                                            <i className='material-icons'>edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                   </div>

               </div>
           </div>
        )
    }
}

export default App1;