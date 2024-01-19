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
          <div className='card' key={mes.id}  onClick={()=>{navigate(`/mes/${mes.id}`)}}>
            <h1> {mes.nombre} </h1>
            <h3> {mes.sueldo_total} </h3>
            <h4> {mes.resto} </h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Elements
