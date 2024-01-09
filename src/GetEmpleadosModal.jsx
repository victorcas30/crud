import { useState,useEffect,useContext, useRef } from "react";
import { getEmpleados,getEmpleadosConBusqueda } from "./leerApis";
import empleadosContext from "./empleadosContext";
import Modal from "./Modal";
import Alerts from "./Alerts";
import Loading from "./Loading";
import ModalEmpleado from "./ModalEmpleado";
import jsPDF from "jspdf";
import "jspdf-autotable";



const GetEmpleadosModal = () =>{
    const data = useContext(empleadosContext);
    const {
        setEmpleados,
        empleados,
        fechaFormateada,
        setIsEdit,
        setEmpleado,
        eliminarEmpleado,
        guardado, 
        editado,
        eliminado,
        mostrarConfirmacion,
        confirmEliminarEmpleado,
        cancelEliminar,
        isLoading,
        setIsLoading,
        isEdit,
        fechaFormateadaHoy,
        cambiosEmpleados, 
        setCambiosEmpleados
    } = data; 

    const inputBuscarRef = useRef();
    const [modalEmpleadoAbierto, setModalEmpleadoAbierto] = useState(false);
    const [empleadoModal, setEmpleadoModal] = useState({});

    useEffect(()=>{
        if(inputBuscarRef.current.value.length === 0){
            setIsLoading(true);
            getEmpleados().then(empleados=>{
                const {empleados:empleadosbd} = empleados;
                setEmpleados(empleadosbd);
            }).catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });

        }
    },[]);

    useEffect(() => {
        if(cambiosEmpleados){
            setIsLoading(true);
            getEmpleados().then(empleados=>{
                const {empleados:empleadosbd} = empleados;
                setEmpleados(empleadosbd);
            }).catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
            setCambiosEmpleados(false);
        }
    },[cambiosEmpleados]);

    const editarEmpl = id => {
        setIsEdit(true);
        setModalEmpleadoAbierto(true);
        const empleadoEditar = empleados.find(empleado => empleado.id === id);
        setEmpleado({});
        setEmpleadoModal(empleadoEditar);
    }

    const buscar = e => {
        if(e.keyCode === 13){
            setIsLoading(true);
            getEmpleadosConBusqueda(inputBuscarRef.current.value).then(todo => {
                const {empleados:empleadostodos} = todo;
                setEmpleados(empleadostodos);
                setIsLoading(false);
            })          
        }
    }

    const abrirModalEmpleado = () => {
        setModalEmpleadoAbierto(true);
    };

      const cerrarModalEmpleado = () => {
        setModalEmpleadoAbierto(false);
    };

      const generarReporte = () => {
        // l para horizontal y p para vertical
        const pdf = new jsPDF("l","pt","letter");

        let num = 1;
        const dataEmpleados = empleados.map(empleado => {
            const {nombre,apellido,dui,fechanacimiento} = empleado;
            const fechaNacFormt = fechaFormateada(fechanacimiento);
            const arrayEmpleados = {
                num,
                nombre,
                apellido,
                dui,
                fechaNacFormt,
            }
            num++;
            const dataArrayEmpleados = Object.values(arrayEmpleados);
            return dataArrayEmpleados;
        });
        
        pdf.autoTable({
            didDrawPage:(data) => {
                pdf.setFontSize(11)
                pdf.text("Reporte de Empleados",40,30)
                pdf.text(fechaFormateadaHoy(),650,30)
                pdf.line(40,35,750,35,"F")
                pdf.text("Reporte Generado por: vcastillo :)",40,585)
                pdf.line(40,570,750,570,"F")
                //Agregar # de Pagina
                const totalPages = pdf.internal.getNumberOfPages();
                const currentPage = data.pageNumber;
                pdf.setFontSize(11);
                pdf.text(`Página ${currentPage} de ${totalPages}`, 650, 585);
                
            },
            head:[["#","Nombre","Apellido","DUI","Fecha Nacimiento"]],
            body:dataEmpleados,
            headStyles: {
                fillColor: [0, 0, 0], 
                textColor: 255 
              }
            //theme:"grid",
        });
        
        window.open(pdf.output("bloburl"));

       };

   return(
   <>
   <Modal className="custom-modal" isOpen={mostrarConfirmacion} confirmEliminar={confirmEliminarEmpleado} cancelEliminar={cancelEliminar} isEdit={isEdit} />
   <ModalEmpleado className="custom-modal" isOpen={modalEmpleadoAbierto} onClose={cerrarModalEmpleado} empleadoModal={empleadoModal}  />
   <div className="container">
   {guardado && <Alerts mensaje="Empleado guardado exitosamente ✅" tipo="success"/>}
   {editado && <Alerts mensaje="Empleado editado exitosamente 🖍️" tipo="warning"/>}
   {eliminado && <Alerts mensaje="Empleado eliminado exitosamente ❌" tipo="danger"/>}
      <h1 className="display-4 mt-4">Empleados Modal</h1>
      <hr/>
        <input type="file" capture="camera" accept="image/*" id="camera" />
        <input type="file" accept="image/*" id="gallery" />
       <input type="file" capture="camera" accept="image/*" multiple id="camera-gallery" />
       <input type="file" capture="camera" accept="image/*" multiple id="camera-gallery" />
    <button type="button" onclick="showGallery()">Abrir galería</button>

      <div style={{ display: "flex", alignItems: "center" }}>
      <input type="text" className="form-control w-50" placeholder="Buscar" ref={inputBuscarRef} onKeyUp={e => buscar(e)} />
      <div style={{ marginLeft: "auto" }}>
      <div className="btn-group" role="group">
      <button className="btn btn-danger" style={{ marginLeft: "auto" }} onClick={generarReporte}>PDF</button>
      <button className="btn btn-info ms-2" style={{ marginLeft: "auto" }} onClick={abrirModalEmpleado}>Agregar</button>
      </div>
      </div>
      </div>
      {isLoading && <Loading/> }
      <br />
    <div className="table-responsive">
    <table className="table table-secondary table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Dui</th>
                    <th>Fecha de Nacimiento</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                empleados.map(empleadoMap => {
                    const {id,nombre,apellido,dui,fechanacimiento} = empleadoMap;
                    return <tr key={id}>
                        <td>{id}</td>
                        <td>{nombre}</td>
                        <td>{apellido}</td>
                        <td>{dui}</td>
                        <td>{fechaFormateada(fechanacimiento)}</td>
                        <td> 
                        <div className="btn-group" role="group">
                            <button className="btn btn-warning" onClick={() => editarEmpl(id)} >Editar</button>
                            <button className="btn btn-danger ms-4" onClick={() => eliminarEmpleado(id)}>Eliminar</button> 
                        </div>
                        </td>
                    </tr>
                })
               }
            </tbody>
        </table>
        </div>
    </div>
   </>
   )
}


export default GetEmpleadosModal;
