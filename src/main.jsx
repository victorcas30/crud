import ReactDOM from 'react-dom/client'
import EmpleadosProvider from './EmpleadosProvider'
import Rutas from './Rutas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <EmpleadosProvider>
    <Rutas/>
  </EmpleadosProvider>
)
