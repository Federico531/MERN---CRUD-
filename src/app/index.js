//Archivo inicial de nuestra aplicacion 
import React from 'react'
import { render } from 'react-dom'; //destructuring
import App2 from './App';  //este nombre puedo mantenerlo igual ya que en teoria seria el mismo codigo puesto en uso donde se necesita
//Se puede extender, importar por ejemplo React.router 
//Componente principal

render(<App2/>, document.getElementById("app1")); //aca le vamos a decir donde va a ir montada mi clase (en /public/index.html/)