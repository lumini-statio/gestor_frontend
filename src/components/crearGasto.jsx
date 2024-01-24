import React, { useState, useEffect } from 'react';
import { getAllMeses } from './../api/meses.api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearGastoForm = () => {
  const [data, setData] = useState({
    mes: 0,
    nombre: '',
    descripcion: '',
    cantidad: 0,
  });
  const [meses, setMeses] = useState([]);
  const [mesId, setMesId] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    fetchMeses();
  }, []);

  const fetchMeses = async () => {
    try {
      const res = await getAllMeses();
      setMeses(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de meses', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name=='cantidad') {
        setData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    }
    else {
        setData((prev) => ({ ...prev, [name]: value}));
    }
  };

  const handleSelectChange = (e) => {
    const mesId = e.target.value;
    setMesId(mesId);
    setData((prev) => ({ ...prev, mes: parseInt(mesId, 10) }));
  };  
  
  const handleCrearGasto = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/guardar_gastos/', data);
      console.log('Respuesta del backend:', res.data);
      navigate('/')
    } catch (error) {
      console.error('Error al crear el gasto', error);
    }
  };
  

  return (
    <div className='card-2 centrado px-5'>
      <h2>Crear Gasto</h2>
      <form>
        <label className='form-label'>Mes:</label>
        <select className='form-select' value={mesId} onChange={handleSelectChange}>
          <option value=''>Seleccione un mes</option>
          {meses.map((mes) => (
            <option key={mes.id} value={mes.id}>
              {mes.nombre}
            </option>
          ))}
        </select>

        <label className='form-label' >Nombre:</label>
        <input className='form-control' type="text" name='nombre' onChange={handleInputChange} required={true} />

        <label className='form-label'>Descripción:</label>
        <textarea className='form-control' name='descripcion' onChange={handleInputChange} required={true} />

        <label className='form-label'>Cantidad:</label>
        <input className='form-control' type="number" name='cantidad' onChange={handleInputChange} required={true}/>
        <div className="centrado">
            <button type="button" className='btn btn-success' onClick={handleCrearGasto}>
            Crear Gasto
            </button>
        </div>
      </form>
    </div>
  );
};

export default CrearGastoForm;
