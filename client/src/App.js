import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [id, setId] = useState();

  const [empleadosList, setEmpleados] = useState([]);
  const [editar, setEditar] = useState(false);

  //REGISTRAR
  const add=()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
        getEmpleados();
        limpiarCampos();
        
        Swal.fire({
          title: "<strong>Registro Exitoso</strong>",
          html: "<i>El empleado(a) <strong>"+ nombre + "</strong> fue registrado con exito!!!</i>",
          icon: "success"
        });
    });
  }

  // ACTUALIZAR 
  const update=()=>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
        getEmpleados();
        limpiarCampos();

        Swal.fire({
          title: "<strong>Actualizacion Exitosa!!!</strong>",
          html: "<i>Se han actualizado los datos de <strong>"+ nombre + "</strong> de manera exitosa!!!</i>",
          icon: "success"
        });
    });
  }

// EDITAR EMPLEADO
  const editarEmpleado = (val) =>{
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }

  // ELIMINAR
  const eliminarEmpleado=(val)=>{
    Swal.fire({
      title: "Esta seguro?",
      html: "<i>Realmente desea eliminar a <strong>" + val.nombre+"</strong>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getEmpleados();
          limpiarCampos();
      });

        Swal.fire({
          title: val.nombre + " fue eliminado(a)!",
          showConfirmButton: false,
          icon: "success",
          timer: 2000
        });
      }
    });

  }


// OBTENER LISTADO
  const getEmpleados=()=>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
        setEmpleados(response.data);
    });
  }

// LIMPIAR CAMPOS
  const limpiarCampos=()=>{
    setAnios("");
    setNombre("");
    setCargo("");
    setPais("");
    setEdad("");
    setEditar(false);
  }
  //getEmpleados();

  return (

  <div className="App"><br/>

<div className="container">

<div className="card text-center">
    <div className="card-header"><strong>GESTION DE EMPLEADOS</strong></div>

      <div className="card-body">

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input onChange={(event)=>{setNombre(event.target.value);}} 
          type="text" className="form-control" value={nombre} placeholder='Ingrese un nombre' aria-label="Usernombre" aria-describedby="basic-addon1"/>
      </div>
     
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input onChange={(event)=>{setEdad(event.target.value);}} 
          type="number" className="form-control" value={edad} placeholder='Ingrese su edad' aria-label="Ingrese su edad" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Pais:</span>
          <input onChange={(event)=>{setPais(event.target.value);}} 
          type="text" className="form-control" value={pais} placeholder='Ingrese su pais' aria-label="Ingrese su pais" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo:</span>
          <input onChange={(event)=>{setCargo(event.target.value);}} 
          type="text" value={cargo} className="form-control"  placeholder='Ingrese el cargo' aria-label="Ingrese el cargo" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Años de Experiencia:</span>
          <input onChange={(event)=>{setAnios(event.target.value);}} 
          type="number" value={anios} className="form-control" placeholder='Ingrese los años de trabajo' aria-label="Ingrese los años de trabajo" aria-describedby="basic-addon1"/>
      </div>


    </div>       
      </div>
      <br/>
      <div className="card-footer text-muted">
        {
         editar?
         <div>
          <button className='btn btn-warning m-1' onClick={update}>Actualizar</button> 
          <button className='btn btn-info m-1' onClick={limpiarCampos}>Cancelar</button>
          </div>
         :
         <div>
         <button className='btn btn-success m-1' onClick={add}>Registrar</button>
         <button className='btn btn-info m-1' onClick={getEmpleados}>Listar Empleados</button>
         </div>
        }
      
      </div>
          
      <br/>

<table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Edad</th>
        <th scope="col">Pais</th>
        <th scope="col">Cargo</th>
        <th scope="col">Experiencia</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
          {
           empleadosList.map((val,key)=>{
              return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>
                          <div className="btn-goup" role="group" aria-label="Basic example">
                          <button className='btn btn-info m-1' 
                          onClick={()=>{
                              editarEmpleado(val);
                          }}>Editar</button>
                          <button className='btn btn-danger m-1' onClick={()=>{eliminarEmpleado(val);}}>Eliminar</button> 
                          </div>  
                      </td>
                    </tr>
           })
          }

    </tbody>
</table>

  </div>


</div>

  
  );
}

export default App;
