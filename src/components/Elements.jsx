import React, { useState } from 'react'
import { useEffect } from 'react'
import { getAllMeses } from '../api/meses.api'
import { useNavigate } from 'react-router-dom'

const Elements = () => {

  const [meses, setMeses] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    async function cargarMeses() {
      const res = await getAllMeses()
      setMeses(res.data)
    }
    cargarMeses()
  }, [])

  return (
    <div className='flex'>
      <div className='grid'>
        {meses.map(mes => (
          <div className='card card-container' key={mes.id}>
            <div className='' onClick={()=>{navigate(`/mes/${mes.id}`)}}>
              <div className='centrado'>
                <h1> {mes.nombre} </h1>
              </div>
              <div className='centrado'>
                <h3> {mes.sueldo_total} </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Elements
