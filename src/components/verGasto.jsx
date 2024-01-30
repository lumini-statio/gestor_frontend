import React, { useEffect, useState } from 'react';
import { deleteGasto, getGasto } from '../api/gastos.api';
import { useParams, useNavigate } from 'react-router-dom';
import atrasImg from '../../src/img/atras.png';

const VerGasto = () => {
  const { mesId, gastoId } = useParams();

  const numericMesId = parseInt(mesId, 10);
  const numericGastoId = parseInt(gastoId, 10);
  const [gasto, setGasto] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const extraerGastos = async () => {
      try {
        const response = await getGasto(numericGastoId);
        setGasto(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener el gasto', error);
      }
    };

    extraerGastos();
  }, [numericGastoId]);
  
  return (
    <div>
        <div className='atras py-3'>
            <img src={atrasImg} alt="atras" onClick={()=>{navigate(`/mes/${numericMesId}`)}}/>
        </div>

        <div className="card-2">

            <h1 className='py-3'>Nombre: {gasto.nombre}</h1>
            {
                gasto.descripcion ? (
                    <h3 className='py-3'>Descripcion: "{gasto.descripcion}" </h3>
                )
                : (
                    <h3 className='py-3'>No hay Descripción</h3>
                )
            }
            <h3 className='py-3'>Gastado: {gasto.cantidad} </h3>
        </div>
    </div>
  )
};

export default VerGasto;