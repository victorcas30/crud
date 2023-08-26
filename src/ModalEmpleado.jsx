import "./ModalEmpleado.css";
import { useContext, useEffect, useState } from "react";
import empleadosContext from "./empleadosContext";
import { useForm } from "react-hook-form";

const ModalEmpleado = ({ isOpen, onClose, empleadoModal }) => {
  if (!isOpen) return null;
  
  const {register,handleSubmit,formState,watch,reset,setValue } = useForm({ resetOnSubmit: true });
  const {errors} = formState;
  const data = useContext(empleadosContext);
  const {saveEmpleado,isEdit,editarEmpleadoModal,setIsEdit} = data;
  const [idEmpleado, setIdEmpleado] = useState(0);

  useEffect(() => {
    if (isEdit && empleadoModal) {
      const {id, nombre, apellido, dui, fechanacimiento } = empleadoModal;
      const fechaString = fechanacimiento.split('T')[0];
      setValue("nombre", nombre);
      setValue("apellido", apellido);
      setValue("dui", dui);
      setValue("fechanacimiento", fechaString);
      setIdEmpleado(id);
    } else {
      reset();
    }
  }, [isEdit, empleadoModal, setValue, reset]);
  
  const handleCancelar = () => {
    setIsEdit(false);
    onClose();
  };

  return (
    <div className="modal-overlay custom-modal">
      <div className="modal-content">
      {isEdit ? <h3>Edit Empleado</h3> : <h3>Set Empleado</h3> }
        <div>
        <form onSubmit={handleSubmit(isEdit ? data => editarEmpleadoModal(data,reset,idEmpleado,onClose) : data => saveEmpleado(data,reset,onClose))}>
            <table className="table table-light table-hover">
            <thead></thead>
            <tbody>
                <tr>
                    <td><h5>Nombre: </h5></td>
                    <td>
                        <input type="text" {...register("nombre",{validate:value => value.trim().length > 2})} className={`form-control w-50 ${errors.nombre ? "is-invalid" : ""} `}  />
                        {errors.nombre?.type === "validate" && <div className="invalid-feedback">Escriba un nombre valido *</div>}
                    </td>
                </tr>
                <tr>
                    <td><h5>Apellido: </h5></td>
                    <td>
                        <input type="text" {...register("apellido",{validate:value => value.trim().length > 2})} className={`form-control w-50 ${errors.apellido ? "is-invalid" : ""} `} />
                        {errors.apellido?.type === "validate" && <div className="invalid-feedback">Escriba un apellido valido *</div>}
                    </td>
                </tr>
                <tr>
                    <td><h5>DUI: </h5></td>
                    <td>
                        <input type="text" {...register("dui",{validate:value => value.trim().length >= 10 && value.trim().length <= 10})} className={`form-control w-50 ${errors.dui ? "is-invalid" : ""} `} />
                        {errors.dui?.type === "validate" && <div className="invalid-feedback">Escriba un dui de 10 digitos *</div>}
                    </td>
                </tr>
                <tr>
                    <td><h5>Fecha de Nacimiento: </h5></td>
                    <td>
                        <input type="date" {...register("fechanacimiento",{required:true})} className={`form-control w-50 ${errors.fechanacimiento ? "is-invalid" : ""} `} />
                        {errors.fechanacimiento?.type === "required" && <div className="invalid-feedback">Escriba una fecha de nacimiento *</div>}
                    </td>
                </tr>
            </tbody>
        </table>
        {
            isEdit ?
            <>
            <button type="submit" className="modal-button accept-button" >Guardar Cambios</button>
            <button className="modal-button cancel-button"  onClick={handleCancelar}>Cancelar</button>
            </> 
            : 
            <div className="modal-buttons">
            <button type="submit" className="modal-button accept-button" >Guardar</button>
            <button className="modal-button cancel-button" onClick={handleCancelar}>Cancelar</button>
            </div>
        }
        </form> 
        </div>
      </div>
    </div>
  );
};

export default ModalEmpleado;
