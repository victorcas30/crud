import { Route, Routes, BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import Home from "./Home";
import Loading from "./Loading";
import Error404 from "./Error404";
import GetEmpleadosModal from "./GetEmpleadosModal";

const Rutas = () => {
    return(
        <>
        <BrowserRouter>
        <Menu/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/getempleadosmodal" element={<GetEmpleadosModal/>} />
            <Route path="/loading" element={<Loading/>} />
            <Route path="*" element={<Error404/>} />
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default Rutas;