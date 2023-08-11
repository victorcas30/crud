import { NavLink } from "react-router-dom";

const Menu = () =>{
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark" >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Menu</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active isActive" : "nav-link active"} aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link isActive" : "nav-link"} to="/getempleadosmodal">Empleados Modal</NavLink>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </>
    )
}

export default Menu;