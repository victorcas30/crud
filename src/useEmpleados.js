import { useState } from "react";
import { getEmpleados,guardarEmpleado,editarEmpleadoFetch,eliminarEmpleadoFetch,getEmpleadosConcat } from "./leerApis";

const useEmpleados = () => {
    const [empleados,setEmpleados]=useState([]);
    const [empleado,setEmpleado] = useState([]);
    const [isEdit,setIsEdit] = useState(false);
    const [guardado,setGuardado] = useState(false);
    const [editado,setEditado] = useState(false);
    const [eliminado,setEliminado] = useState(false);
    const [error,setError] = useState(false);
    const [mostrarConfirmacion,setMostrarConfirmacion] = useState(false);
    const [idEmpleadoEliminar,setIdEmpleadoEliminar] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [cambiosEmpleados, setCambiosEmpleados] = useState(false);

    const saveEmpleado = (data,reset,onClose) => {
        setIsLoading(true);
        const copyEmpleado = {...data};
        console.log(copyEmpleado)
        setEmpleado([copyEmpleado]);
        guardarEmpleado(copyEmpleado).then(res=>{
            console.log(JSON.stringify(res));
            setIsLoading(false);
        }).catch(error => {
            console.error(error);
            setIsLoading(false);
        });
        setCambiosEmpleados(true);
        setGuardado(true);
        setTimeout(() => {
            setGuardado(false);
        }, 5000);
        reset();
        onClose();
    }

     const editarEmpleadoModal = (data,reset,idEmpleado,onClose) =>{
        setIsLoading(true);
        const copyEmpleadoEdit = {...data};
        copyEmpleadoEdit.id = idEmpleado;
        setEmpleado([copyEmpleadoEdit]);
        console.log(copyEmpleadoEdit);
        editarEmpleadoFetch(copyEmpleadoEdit).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
            setIsLoading(false);
        }).catch(error => {
            console.error(error);
            setIsLoading(false);
        });
        setCambiosEmpleados(true);
        setIsEdit(false);
        onClose();
        setEditado(true);
        setTimeout(() => {
            setEditado(false);
        }, 5000);
        reset();
     }


    const cancelarEdit = (reset) => {
        setIsEdit(false);
        reset();
    }

    const eliminarEmpleado = id => {
        setIdEmpleadoEliminar(id);
        setMostrarConfirmacion(true);
    }

    const confirmEliminarEmpleado = () =>{
        setIsLoading(true);
        const copyEmpleadoDelete = {id: idEmpleadoEliminar};
        eliminarEmpleadoFetch(copyEmpleadoDelete).then(respuesta=>{
            console.log(JSON.stringify(respuesta));
            setIsLoading(false);
        }).catch(error => {
            console.error(error);
            setIsLoading(false);
        });
        setCambiosEmpleados(true);
        setIdEmpleadoEliminar(0);
        setMostrarConfirmacion(false);
        setEliminado(true);
        setTimeout(() => {
            setEliminado(false);
        }, 5000);
     }

     const cancelEliminar = () => {
        setMostrarConfirmacion(false);
    }

    const fechaFormateada = (fechanacimiento) => {
        const fechaNacimientoEmpleado = new Date(fechanacimiento);
        const dia = fechaNacimientoEmpleado.getDate().toString().padStart(2, '0');
        const mes = (fechaNacimientoEmpleado.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaNacimientoEmpleado.getFullYear().toString();
        const horas = fechaNacimientoEmpleado.getHours().toString().padStart(2, '0');
        const minutos = fechaNacimientoEmpleado.getMinutes().toString().padStart(2, '0');
        const segundos = fechaNacimientoEmpleado.getSeconds().toString().padStart(2, '0');
        //const fechaHoraFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
        const fechaHoraFormateada = `${dia}/${mes}/${anio}`;
        return fechaHoraFormateada;
    }
    const fechaFormateadaHoy = () => {
        const fechaHoy = new Date();
        const dia = fechaHoy.getDate().toString().padStart(2, '0');
        const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaHoy.getFullYear().toString();
        const horas = fechaHoy.getHours().toString().padStart(2, '0');
        const minutos = fechaHoy.getMinutes().toString().padStart(2, '0');
        const segundos = fechaHoy.getSeconds().toString().padStart(2, '0');
        const fechaHoraFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
        return fechaHoraFormateada;
    }

    return {
        setEmpleados,
        empleados,
        saveEmpleado,
        fechaFormateada,
        setIsEdit,
        setEmpleado,
        isEdit,
        cancelarEdit,
        eliminarEmpleado,
        guardado,
        editado,
        eliminado,
        confirmEliminarEmpleado,
        cancelEliminar,
        mostrarConfirmacion,
        error,
        setIsLoading,
        isLoading,
        editarEmpleadoModal,
        fechaFormateadaHoy,
        cambiosEmpleados, setCambiosEmpleados
    }

}

export default useEmpleados;