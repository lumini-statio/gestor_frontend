import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './components/Main';
import Elements from './components/Elements';
import Header from './components/Header';
import Mes from './components/Mes';
import EditMesPage from './components/editarMes';
import CrearGastoForm from './components/crearGasto';
import Footer from './components/Footer';

function App() {

  return (
    <div>
      <BrowserRouter>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path='/crear-mes' element={<Main/>} />
          <Route path='/' element={<Elements/>} />
          <Route path='/mes/:id' element={<Mes/>} />
          <Route path='/edit/:id' element={<EditMesPage/>} />
          <Route path='/mes/:id/crear-gasto' element={<CrearGastoForm/>} />
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
