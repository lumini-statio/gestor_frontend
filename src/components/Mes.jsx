import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { deleteMes, getMes } from '../api/meses.api'
import { getAllGastos } from '../api/gastos.api';

const Mes = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [mes, setMes] = useState({})
    const [gastosDelMes, setGastosDelMes] = useState([])

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
    async function cargarGastos() {
      if (params.id) {
        try {
          const res = await getAllGastos();
          console.log('res', res)
          const gastosDelMes = res.data.filter((gasto) => gasto.mes == params.id);
          console.log('params.id',params.id)
          setGastosDelMes(gastosDelMes);
          console.log(gastosDelMes);
        } catch (error) {
          console.error('Error al cargar los gastos', error);
        }
      }
    }
    cargarMes()
    cargarGastos()
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
          <button className='btn btn-danger px-5' onClick={borrarMes}> Borrar </button>
          <button className='btn btn-success px-5' onClick={()=>{

            navigate(`/edit/${params.id}`
          )}}> Editar </button>
        </div>
      }
    <h1>Otros Gastos</h1>
    <div div className='gasto-container-2'>
          <div className='listado-gastos'>
          {gastosDelMes.length > 0 ? (
            gastosDelMes.map((gasto) => (
              <div className="card-3 card-container flex-container" key={gasto.id}>
                <div>
                  <h6> {gasto.nombre} </h6>
                  <h6> ${gasto.cantidad} </h6>
                </div>
              </div>
            ))
          ) : (
            <div className="centrado">
              <h4>No hay gastos para este mes.</h4>
            </div>
          )}
          
          </div>
        </div>
    </div>
  )
}

export default Mes
