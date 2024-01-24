import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMes, actualizarMes } from '../api/meses.api';
import addImg from '../../public/add.png'
import { getAllGastos } from '../api/gastos.api';

const EditMesPage = () => {
  const [state, setState] = useState({
    sueldo_total: 0,
    resultado: 0,
    gasto_comida: 0,
    gasto_gas: 0,
    gasto_agua: 0,
    gasto_luz: 0,
    resto: 0,
    nombre: '',
    expensas: 0,
    alquiler: 0,
    wifi: 0,
  });

  const [gastos, setGastos] = useState([])

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function cargarMes() {
      if (params.id) {
        try {
          const response = await getMes(params.id);
          setState(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error al cargar datos del mes', error);
        }
      }
    }
    async function cargarGastos() {
      if (params.id) {
        try {
          const res = await getAllGastos()
          setGastos(res.data)
          console.log(res.data)
        }
        catch (error) {
          console.error('Error al cargar los gastos', error)
        }
      }
    }
    cargarMes();
    cargarGastos();
  }, []);

  const handleInputChange=(e)=>{
    const {name, value} = e.target;
    setState((prev)=>(
        {
          ...prev,
          [name]: parseFloat(value) || 0
        }
    ))
  }

  const handleNombreChange = (e) => {
    const nombreInput = e.target.value;
    setState((prev) => ({ ...prev, nombre: nombreInput }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await actualizarMes(params.id, state);
      }
      navigate(`/mes/${params.id}`);
    } catch (error) {
      console.error('Error al actualizar datos del mes', error);
    }
  };

  useEffect(() => {
    const numericResultado = parseFloat(state.resultado) || 0;
    const numericAgua = parseFloat(state.gasto_agua) || 0;
    const numericGas = parseFloat(state.gasto_gas) || 0;
    const numericLuz = parseFloat(state.gasto_luz) || 0;
    const numericComida = parseFloat(state.gasto_comida) || 0;
    const numericExpensas = parseFloat(state.expensas) || 0;
    const numericAlquiler = parseFloat(state.alquiler) || 0;
    const numericWifi = parseFloat(state.wifi) || 0;
  
    if (!isNaN(numericResultado) &&
        !isNaN(numericAgua) &&
        !isNaN(numericGas) &&
        !isNaN(numericLuz) &&
        !isNaN(numericComida) &&
        !isNaN(numericExpensas) &&
        !isNaN(numericAlquiler) &&
        !isNaN(numericWifi)) {
  
      const gastos = numericResultado - (numericAgua + numericGas + numericLuz + numericComida + numericExpensas + numericAlquiler + numericWifi);
      setState((prev) => ({ ...prev, resto: parseFloat(gastos) }));
    }
        console.log(state)
  }, [state.resultado, state.gasto_gas, state.gasto_luz, state.gasto_agua, state.gasto_comida, state.expensas, state.alquiler, state.wifi]);

  return (
    <div>
      <div className='card-2'>
      <h1>Editar Gestion Mensual</h1>
      <form onSubmit={handleSubmit}>
      <div className="nombre-mes">
          <h5>Mes</h5>
          <input
            type="text"
            className='form-control'
            name="nombre"
            value={state.nombre}
            onChange={handleNombreChange}
          />
        </div>

        <div className="total">
          <h5>Sueldo</h5>
          <input
            type="number"
            className='form-control'
            name="sueldo_total"
            value={state.sueldo_total}
            onChange={handleInputChange}
          />
        </div>

        <div className="fijos">
          <h2>Gastos Fijos</h2>

          <div className="alquiler">
            <h5>Alquiler</h5>
            <input
              type="number"
              className='form-control'
              name="alquiler"
              value={state.alquiler}
              onChange={handleInputChange}
            />
        </div>

        <div className="expensas">
            <h5>Expensas</h5>
            <input
              type="number"
              className='form-control'
              name="expensas"
              value={state.expensas}
              onChange={handleInputChange}
            />
        </div>

        <div className="gasto_comida">
            <h5>Comida</h5>
            <input
              type="number"
              className='form-control'
              name="gasto_comida"
              value={state.gasto_comida}
              onChange={handleInputChange}
            />
          </div>

          <div className="gasto_agua">
            <h5>Agua</h5>
            <input
              type="number"
              className='form-control'
              name="gasto_agua"
              value={state.gasto_agua}
              onChange={handleInputChange}
            />
          </div>

          <div className="gasto_gas">
            <h5>Gas</h5>
            <input
              type="number"
              className='form-control'
              name="gasto_gas"
              value={state.gasto_gas}
              onChange={handleInputChange}
            />
          </div>

          <div className="gasto_luz">
            <h5>Luz</h5>
            <input
              type="number"
              className='form-control'
              name="gasto_luz"
              value={state.gasto_luz}
              onChange={handleInputChange}
            />
          </div>

          <div className="wifi">
            <h5>Wifi</h5>
            <input
              type="number"
              className='form-control'
              name="wifi"
              value={state.wifi}
              onChange={handleInputChange}
            />
          </div>
            <div className='centrado'>
                <h4>Resto: {state.resto}</h4> 
            </div>
        </div>

        <div className='container centrado'>
          <button type='submit' className='btn btn-success'>Actualizar</button>
        </div>
      </form>
      </div>
      
      <div className="card-2">
        <div className='centrado agregar-titulo'>
          <h2>Otros Gastos</h2>
          <img src={addImg} alt="añadir gasto" className='img-add' onClick={()=>{navigate(`/mes/${params.id}/crear-gasto`)}}/>
        </div>

        <div className='gasto-container'>
          <div className='listado-gastos'>
            {
              gastos.map(gasto => (
                <div className='card-3 card-container' key={gasto.id}>
                    <div>
                      <h6> {gasto.nombre} </h6>
                      <h6> ${gasto.cantidad} </h6>
                    </div>
                    <div>
                      
                    </div>
                </div>
              ))
            }
          </div>
        </div>

        <div>

        </div>
      </div>
    </div>
  );
};

export default EditMesPage;
