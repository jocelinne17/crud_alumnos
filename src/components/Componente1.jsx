import React, { useState } from 'react'

import '../style/style1.css'
const imagen1 = require('../image/foto.png')
const imagen2 = require('../image/images.png')
let ind=0
let mat=''
let nom=''
let ape=''
let car=''
let image=''

export const Componente1 = () => {

  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const alumnoInicial =[
    {matricula:'201901', nombre:'Jocelinne', apellido: 'Arce',carrera:'ING. SISTEMAS', foto: imagen1},
    {matricula:'201902', nombre:'Joce', apellido: 'Arce',carrera:'ING. SISTEMAS', foto: imagen2}

]
const[alumnos, setAlumnos]= useState(alumnoInicial);
const[imagenRuta, setImagenRuta]= useState(alumnoInicial.foto);
const [mostrarTabla, setMostrarTabla] = useState(false);
const [editar,setEditar]=useState(false)
const [texto,setTexto]=useState('REGISTRAR')


const  agregarAlumnos = (event) => {
  event.preventDefault()
  if(editar==false){
    
    const nuevoId = event.target.elements.matri.value;
    const nuevoNombre= event.target.elements.nombre.value;
    const nuevoApellido= event.target.elements.apellido.value;
    const nuevoCarrera = event.target.elements.carrera.value;
    const nuevoFoto = event.target.elements.foto.value;
    
   
        setAlumnos([
            ...alumnos,{matricula: nuevoId, nombre:nuevoNombre, apellido: nuevoApellido, carrera: nuevoCarrera, foto: imagenRuta},
        ]);
  }else{
    mat= event.target.elements.matri.value;
    nom=event.target.elements.nombre.value;
    ape=event.target.elements.apellido.value;
    car= event.target.elements.carrera.value;
    
    alumnos[ind]={...alumnos[ind],matricula:mat,nombre:nom,apellido:ape,carrera:car,foto:imagenRuta}
    setAlumnos(alumnos)
    setEditar(false)
    setTexto('REGISTRAR')
  }
    setNull()
    
}

const eliminarFila = (matricula) => {
    /*const newAlumnos = [...alumnos];
    newAlumnos.splice(index, 1);*/
    setAlumnos(alumnos.filter(obj=>obj.matricula!==matricula));
};

const editarAlumno=(index,matricula,nombre,apellido,carrera, fot)=>{
    document.querySelector('#matri').value = matricula
    document.querySelector('#nombre').value =nombre
    document.querySelector('#apellido').value =apellido
    document.querySelector('#carrera').value = carrera
    document.querySelector('#foto').value = ''
    ind=index
    
    setEditar(true)
    setTexto('EDITAR')
    handleScrollToTop()
    
  }

  const obtenerRuta = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader()
    reader.addEventListener('load', () => {
        setImagenRuta(reader.result)
    })
    if (file) {
        reader.readAsDataURL(file)
    }
  };
  
const handleScrollToTop = () => {
window.scrollTo(0, 0);
}




const handleClick = () => {
    setMostrarFormulario(!mostrarFormulario);  
}
const setNull=()=>{
  document.querySelector('#matri').value = ''
    document.querySelector('#nombre').value =''
    document.querySelector('#apellido').value =''
    document.querySelector('#carrera').value =''
    document.querySelector('#foto').value = ''
}


return (
  <div>
  <div>
  <button class="mi_boton" onClick={handleClick} >Mostrar formulario</button>
  {mostrarFormulario && (
    <form onSubmit={agregarAlumnos}>
      <h2>REGISTRO DE ALUMNOS</h2>
      <div className="form-group">
        <label htmlFor="matri">Matricula:</label>
        <input type="text" id="matri" name="matri" required />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" required />
      </div>
      <div>
    <label htmlFor="carrera">Carrera:</label>
    <select id="carrera" name="carrera">
      <option value="" selected>--SELECCIONE--</option>
      <option value="ING. SISTEMAS">ING. SISTEMAS</option>
      <option value="ING. CIVIL">ING. CIVIL</option>
      <option value="ING. INDUSTRIAL">ING. INDUSTRIAL</option>
      <option value="ING. MECATRONICA">ING. MECATRONICA</option>
      <option value="NG. LOGISTICA">ING. LOGISTICA</option>
      <option value="ING. TICS">ING. TICS</option>
      <option value="LIC. ADMINISTRACION">LIC. ADMINISTRACION</option>
    </select>
  </div>
  <div>
    <label htmlFor="nue">Selecciona una imagen de perfil:</label>
    <input type="file" id="foto" name="foto" accept="image/*" onChange={obtenerRuta}/>
  </div>
  <button >{texto}</button>
  </form>
    )}
  </div>

<div>
<table border={1}>
            <thead>
                <tr>
                    <th>MATRICULA</th>
                    <th>NOMBRE</th>
                    <th>APELLIDO</th>
                    <th>CARRERA</th>
                    <th>FOTO</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    alumnos.map((item, index)=>(
                        <tr>
                          
                            <td>{item.matricula}</td>
                            <td>{item.nombre}</td>
                            <td>{item.apellido}</td>
                            <td>{item.carrera}</td>
                            <td><img src={item.foto} width={"100px"} height={"50px"}/></td>
                            <td><button onClick={()=>editarAlumno(index,item.matricula,item.nombre,item.apellido, item.carrera, item.foto) }>EDITAR</button></td>
                            <td><button onClick={()=>eliminarFila(item.matricula)}>ELIMINAR</button></td>
                        </tr>
                    ))

                }
            </tbody>
            
        </table>        
</div>
</div>
  )
}
export default Componente1;