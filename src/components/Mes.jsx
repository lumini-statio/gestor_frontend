import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { deleteMes, getMes } from '../api/meses.api'
import { getAllGastos } from '../api/gastos.api';
import verImg from '../../src/img/ver.png';
import atrasImg from '../../src/img/atras.png';

const Mes = () => {

    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation();
    const [mes, setMes] = useState({})
    const [gastosDelMes, setGastosDelMes] = useState([])
    const [totalGastos, setTotalGastos] = useState(0)
    const [listaNumeros, setListaNumeros] = useState([1,1])

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
            console.log('Mes', mes)
        }
    }
    cargarMes()
  }, [])

  useEffect(() => {
    async function cargarGastos() {
      if (params.id) {
        try {
          const res = await getAllGastos();
          console.log('res', res);
          const gastosDelMes = res.data.filter((gasto) => gasto.mes == params.id);
          let totalGastosMes = 0;
          for (const gasto of gastosDelMes) {
            totalGastosMes += parseFloat(gasto.cantidad);
          }
          setTotalGastos(parseFloat(totalGastosMes));

          setGastosDelMes(gastosDelMes);
          console.log('gastos del mes',gastosDelMes);
          console.log('total gastos', totalGastos)
        } catch (error) {
          console.error('Error al cargar los gastos', error);
        }
      }
    }

    cargarGastos();
  }, [params.id]);

  const handleVerGasto = (gastoId) => {
    navigate(`${location.pathname}/gasto/${gastoId}`);
  }

  const renderBarraPorcentaje = () => {
    const porcentajes = {
      alquiler: 0,
      expensas: 0,
      gasto_comida: 0,
      gasto_agua: 0,
      gasto_gas: 0,
      gasto_luz: 0,
      wifi: 0,
      otros_gastos: 0,
    };

    if (typeof totalGastos === 'number' && totalGastos !== 0) {
      for (const key in mes) {
        if (
          typeof mes[key] === 'string' &&
          !isNaN(parseFloat(mes[key])) &&
          key !== 'sueldo_total' &&
          key !== 'resto' &&
          key !== 'resultado'
        ) {
          porcentajes[key] = (parseFloat(mes[key]) / parseFloat(mes.sueldo_total)) * 100;
        }
      }
      porcentajes.otros_gastos = (totalGastos / parseFloat(mes.sueldo_total)) * 100;
      console.log('porcentajes', porcentajes)
    }

    return (
      <div className="bar-container">
        {Object.entries(porcentajes).map(([key, porcentaje]) => (
          <div className='bar-container'>
            <hr />
            <div className='barra-completa'>
              <div key={key} className="bar" style={{ width: `${porcentaje || 0}%` }}></div>
            </div>
            <div className='porcentajes-container centrado'>
            {`${key}: ${porcentaje ? porcentaje.toFixed(2) : 0}%`}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  useEffect(() => {
    const fibonacci = () => {
      let newListaNumeros = [1,1];
  
      for (let i = 2; i < 10; i++) {
        let suma = newListaNumeros[i - 1] + newListaNumeros[i - 2];
        newListaNumeros.push(suma);
      }

      console.log('fibonacci',newListaNumeros);
    };
  
    fibonacci();
  }, []);

  return (
    <div>
      <div className='atras py-3'>
        <img src={atrasImg} alt="atras" onClick={()=>{navigate(`/`)}}/>
      </div>
      <div className="card-2 px-5">
        <h1 className='card-title'>{mes.nombre}</h1>
        <div>
          <div className='column'>
              <h2 className='card-subtitle'>Ingreso:{mes.sueldo_total}</h2>
              <br />
              <h4 className='card-subtitle'>alquiler:{mes.alquiler}</h4>
              <br />
              <h4 className='card-subtitle'>expensas:{mes.expensas}</h4>            
              <br />
              <h4 className='card-subtitle'>comida: {mes.gasto_comida}</h4>
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
            <button className='btn btn-danger px-3' onClick={borrarMes}> Borrar </button>
            <button className='btn btn-success px-3' onClick={()=>{

              navigate(`/edit/${params.id}`
            )}}> Editar </button>
          </div>
        }
        </div>
      </div>
      <div className="card-2">
      <h1>Otros Gastos</h1>
      <div div className='gasto-container-2'>
          <div className='listado-gastos'>
          {gastosDelMes.length > 0 ? (
            gastosDelMes.map((gasto) => (
              <div className="card-3 flex-container" key={gasto.id}>
                  <div>
                    <h6> {gasto.nombre} </h6>
                    <h6> ${gasto.cantidad} </h6>
                  </div>
                  <div className="ver">
                    <img src={verImg} alt="ver más" onClick={()=>handleVerGasto(gasto.id)}/>
                  </div>
                  
              </div>
            ))
          ) : (
            <div className="centrado">
              <h4>Edite este mes para agregar nuevos gastos</h4>
            </div>
          )}
          
          </div>
        </div>
      </div>
      <div className="card-2">
        <div className="centrado">
          <div className="card-title">
            <h1>Porcentaje de gastos</h1>
            <h1>con respecto al sueldo</h1>
          </div>
        </div>
        {renderBarraPorcentaje()}
      </div>
    </div>
  )
}

export default Mes
