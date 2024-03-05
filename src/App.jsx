import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MesCrear from './components/mesCrear';
import Elements from './components/Elements';
import Header from './components/Header';
import Mes from './components/Mes';
import EditMesPage from './components/editarMes';
import CrearGastoForm from './components/crearGasto';
import Footer from './components/Footer';
import VerGasto from './components/verGasto';


function App() {
  return (
    <div>
        <BrowserRouter>
        <header>
          <Header/>
        </header>
        <main className='centrado'>
          <Routes>
            <Route path='/crear-mes' element={<MesCrear/>} />
            <Route path='/' element={<Elements/>} />
            <Route path='/mes/:id' element={<Mes/>} />
            <Route path='/edit/:id' element={<EditMesPage/>} />
            <Route path='/mes/:id/crear-gasto' element={<CrearGastoForm/>} />
            <Route path='/mes/:mesId/gasto/:gastoId' element={<VerGasto/>} />
          </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
      </BrowserRouter>

    </div>
  )
}

export default App
