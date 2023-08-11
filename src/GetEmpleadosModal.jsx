import { useState,useEffect,useContext, useRef } from "react";
import { getEmpleados,guardarEmpleado,getEmpleadosConcat } from "./leerApis";
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
            })
            setIsLoading(false);
        }
    },[]);

    useEffect(() => {
        if(cambiosEmpleados){
            setIsLoading(true);
            getEmpleados().then(empleados=>{
                const {empleados:empleadosbd} = empleados;
                setEmpleados(empleadosbd);
            })
            setIsLoading(false);
            setCambiosEmpleados(false);
        }
    },[cambiosEmpleados]);

    const editarEmpl = id => {
        setIsEdit(true);
        setModalEmpleadoAbierto(true);
        const empleadoEditar = empleados.find(empleado => empleado.id === id);
        setEmpleado({});
        setEmpleadoModal(empleadoEditar);
        console.log(empleadoModal);
        //console.log(empleadoEditar);
    }

    const buscar = e => {
        if(e.keyCode === 13){
            setIsLoading(true);
            getEmpleadosConcat(inputBuscarRef.current.value).then(todo => {
                const {empleados:empleadostodos} = todo;
                console.table(empleadostodos);
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
            console.log(arrayEmpleados);
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
   <Modal isOpen={mostrarConfirmacion} confirmEliminar={confirmEliminarEmpleado} cancelEliminar={cancelEliminar} isEdit={isEdit} />
   <ModalEmpleado isOpen={modalEmpleadoAbierto} onClose={cerrarModalEmpleado} empleadoModal={empleadoModal}  />
   <div className="container">
   {guardado && <Alerts mensaje="Empleado guardado exitosamente ✅" tipo="success"/>}
   {editado && <Alerts mensaje="Empleado eliminado exitosamente 🖍️" tipo="warning"/>}
   {eliminado && <Alerts mensaje="Empleado eliminado exitosamente ❌" tipo="danger"/>}
      <h1 className="display-4">Empleados Modal</h1>
      <hr/>
      {isLoading && <Loading/> }
      <div style={{ display: "flex", alignItems: "center" }}>
      <input type="text" className="form-control w-50" placeholder="Buscar" ref={inputBuscarRef} onKeyUp={e => buscar(e)} />
      <div style={{ marginLeft: "auto" }}>
      <button className="btn btn-danger" style={{ marginLeft: "auto" }} onClick={generarReporte}>PDF</button>
      <button className="btn btn-info ms-2" style={{ marginLeft: "auto" }} onClick={abrirModalEmpleado}>Agregar</button>
      </div>
      </div>
      <br />

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
                            <button className="btn btn-warning" onClick={() => editarEmpl(id)} >Editar</button>
                            <button className="btn btn-danger ms-4" onClick={() => eliminarEmpleado(id)}>Eliminar</button> 
                        </td>
                    </tr>
                })
               }
            </tbody>
        </table>
    </div>
   </>
   )
}


export default GetEmpleadosModal;