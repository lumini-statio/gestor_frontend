import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMes, actualizarMes, getMes } from '../api/meses.api';

const Main = () => {
  const [state, setState] = useState({
    sueldoTotal: 0,
    resultado: 0,
    minimoComida: 0,
    gas: 0,
    agua: 0,
    luz: 0,
    resto: 0,
    nombre: '',
    expensas: 0,
    alquiler: 0,
    wifi: 0,
  });

  const navigate = useNavigate();
  const params = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleNombreChange = (e) => {
    setState((prev) => ({ ...prev, nombre: e.target.value }));
  };

  const enviarDatosAlBackend = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/guardar_datos/', state);
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error al enviar datos al backend', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await actualizarMes(params.id, state);
    } else {
      await enviarDatosAlBackend();
    }
    navigate('/meses');
  };

  useEffect(() => {
    const nuevoSueldo = state.sueldoTotal;
    setState((prev) => ({ ...prev, resultado: parseFloat(nuevoSueldo) }));
  }, [state.sueldoTotal]);

  useEffect(() => {
    const gastos = state.resultado - (state.agua + state.gas + state.luz + state.minimoComida + state.alquiler + state.expensas + state.wifi);
    setState((prev) => ({ ...prev, resto: parseFloat(gastos) }));
  }, [state.resultado, state.gas, state.luz, state.agua, state.minimoComida, state.expensas, state.alquiler, state.wifi]);

  useEffect(() => {
    async function cargarMes() {
      if (params.id) {
        const res = await getMes(params.id);
        console.log(res);
      }
    }
    cargarMes();
  }, []);

  return (
    <div className='card-2'>
      <h1>Crear Gestion Mensual</h1>
      <form onSubmit={handleSubmit}>
        <div className="nombre-mes">
          <label>Mes</label>
          <input
            type="text"
            className='form-control'
            name="nombre"
            value={state.nombre}
            onChange={handleNombreChange}
          />
        </div>

        <div className="total">
          <label>Sueldo</label>
          <input
            type="number"
            className='form-control'
            name="sueldoTotal"
            value={state.sueldoTotal}
            onChange={handleInputChange}
          />
        </div>

        <div className="fijos">
          <h2>Gastos Fijos</h2>

          <div className="gas">
            <label>Gas</label>
            <input
              type="number"
              className='form-control'
              name="gas"
              value={state.gas}
              onChange={handleInputChange}
            />
          </div>

          <div className="luz">
            <label>Luz</label>
            <input
              type="number"
              className='form-control'
              name="luz"
              value={state.luz}
              onChange={handleInputChange}
            />
          </div>

          <div className="agua">
            <label>Agua</label>
            <input
              type="number"
              className='form-control'
              name="agua"
              value={state.agua}
              onChange={handleInputChange}
            />
          </div>

          <div className="comida">
            <label>Comida</label>
            <input
              type="number"
              className='form-control'
              name="minimoComida"
              value={state.minimoComida}
              onChange={handleInputChange}
            />
          </div>

          <div className="expensas">
            <label>Expensas</label>
            <input
              type="number"
              className='form-control'
              name="expensas"
              value={state.expensas}
              onChange={handleInputChange}
            />
          </div>

          <div className="alquiler">
            <label>Alquiler</label>
            <input
              type="number"
              className='form-control'
              name="alquiler"
              value={state.alquiler}
              onChange={handleInputChange}
            />
          </div>

          <div className="wifi">
            <label>Wifi</label>
            <input
              type="number"
              className='form-control'
              name="wifi"
              value={state.wifi}
              onChange={handleInputChange}
            />
          </div>

        </div>

        <div className="container resto centrado">
          <h3>Resto</h3>
          <h2> {state.resto} </h2>
        </div>
        <div className='container centrado'>
          <button type='submit' className='btn btn-success'>Crear</button>
        </div>
        
      </form>

    </div>
  );
};

export default Main;
