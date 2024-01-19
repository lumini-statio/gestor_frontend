import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './components/Main';
import Elements from './components/Elements';
import Header from './components/Header';
import Mes from './components/Mes';
import EditMesPage from './components/editarMes';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/crear-mes' element={<Main/>} />
        <Route path='/' element={<Elements/>} />
        <Route path='/mes/:id' element={<Mes/>} />
        <Route path='/edit/:id' element={<EditMesPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
