import empleadosContext from "./empleadosContext";
import useEmpleados from "./useEmpleados";

const EmpleadosProvider = ({children}) => {
    return <empleadosContext.Provider value={useEmpleados()}>
        {children}
    </empleadosContext.Provider>
    
}

export default EmpleadosProvider;