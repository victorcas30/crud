export const getEmpleados = async() => {
    const headers = {"Authorization":"Bearer "};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch("http://localhost:8000/api/empleados",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const getEmpleadosConcat = async(cadenabusqueda) => {
    const headers = {"Authorization":"Bearer "};
    const options = {method:'GET',headers:headers};
    try{
        const respuesta = await fetch(`http://localhost:8000/empleados/${cadenabusqueda}`,options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const guardarEmpleado = async(empleadoData) => {
    const headers = {"Content-Type":"application/json"};
    const options = {
        method:'POST',
        headers:headers,
        body:JSON.stringify(empleadoData)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/empleados",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const editarEmpleadoFetch = async(empleadoData) => {
    const headers = {"Content-Type":"application/json"};
    const options = {
        method:'PUT',
        headers:headers,
        body:JSON.stringify(empleadoData)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/empleados",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const eliminarEmpleadoFetch = async(empleadoData) => {
    const headers = {"Content-Type":"application/json"};
    const options = {
        method:'DELETE',
        headers:headers,
        body:JSON.stringify(empleadoData)
    }
    try{
        const respuesta = await fetch("http://localhost:8000/api/empleados/delete",options);
        const result = await respuesta.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}