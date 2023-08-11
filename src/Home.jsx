import { useContext } from "react"
import empleadosContext from "./empleadosContext"

const Home = () => {

    const data = useContext(empleadosContext);
    console.log(data);

    return(
        <>
        <div className="container">
            <h1 className="display-4">Home</h1>
            <hr/>

            
            
        </div>
        </>
    )

}

export default Home