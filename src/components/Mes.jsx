import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { deleteMes, getMes } from '../api/meses.api'

const Mes = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [mes, setMes] = useState({})

    const borrarMes = async () => {
        const aceptado = window.confirm('está seguro que desea eliminar este més?')
        if (aceptado) {
          deleteMes(params.id)
          navigate('/')
        }
      }
  useEffect(()=>{
    async function cargarMes() {
        if (params.id) {
            const res = await getMes(params.id)
            setMes(res.data)
            console.log(mes)
        }
    }
    cargarMes()
  }, [])
  return (
    <div className='card-2'>
      <h1 className='card-title'>{mes.nombre}</h1>
        <div>
            <h2 className='card-subtitle'>Ingreso total:{mes.sueldo_total}</h2>
            <br />
            <h4 className='card-subtitle'>alquiler:{mes.alquiler}</h4>
            <br />
            <h4 className='card-subtitle'>expensas:{mes.expensas}</h4>            
            <br />
            <h4 className='card-subtitle'>gasto minimo en comida: {mes.gasto_comida}</h4>
            <br />
            <h4 className='card-subtitle'>agua:{mes.gasto_agua}</h4>
            <br />
            <h4 className='card-subtitle'>gas:{mes.gasto_gas}</h4>
            <br />
            <h4 className='card-subtitle'>luz:{mes.gasto_luz}</h4>
            <br />
            <h4 className='card-subtitle'>wifi:{mes.wifi}</h4>
            <br />
            <h4 className='card-subtitle'>resto:{mes.resto}</h4>
            <br />
        </div>
      {
        params.id && 
        <div className="contenedor centrado">
          <button className='btn btn-danger' onClick={borrarMes}> Borrar </button>
          <button className='btn btn-success' onClick={()=>{
            navigate(`/edit/${params.id}`
          )}}> Editar </button>
        </div>
      }
    </div>
  )
}

export default Mes
