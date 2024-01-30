import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='header navbar navbar-expand-lg rounded'>
          <div className='link navbar-brand' onClick={()=>{
            navigate('/meses')
          }}>
          <h3 className='link-text'>Home</h3>
          </div>

          <div className='link' onClick={()=>{
            navigate('/crear-mes')
          }}>
          <h3 className='link-text' >Crear gestor de Mes</h3>
          </div>
    </div>
  )
}

export default Header
