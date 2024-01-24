import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMes, actualizarMes } from '../api/meses.api';

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
    cargarMes();
  }, []);

  const handleInputChange=(e)=>{
    const {name, value} = e.target;
    setState((prev)=>(
        {
          ...prev,
          [name]: parseFloat(value)
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
    const gastos = state.resultado - (state.agua + state.gas + state.luz + state.minimoComida + state.alquiler + state.expensas + state.wifi);
    setState((prev) => ({ ...prev, resto: parseFloat(gastos) }));
  }, [state.resultado, state.gas, state.luz, state.agua, state.minimoComida, state.expensas, state.alquiler, state.wifi]);

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
            <dir className='centrado'>
                <h4>Resto: {state.resto}</h4>
            </dir>
        </div>

        <div className='container centrado'>
          <button type='submit' className='btn btn-success'>Actualizar</button>
        </div>
      </form>
      </div>
      
      <div className="card-2">
        <div>

        </div>

        <div></div>

        <div></div>
      </div>
    </div>
  );
};

export default EditMesPage;
