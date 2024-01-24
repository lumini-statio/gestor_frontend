import axios from 'axios';
import { getAllMeses } from './meses.api';

const gastosApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/gastos/'
})

export const getAllGastos = () => gastosApi.get('/')

export const getGasto = (gastoId) => gastosApi.get(`/${gastoId}/`)

export const deleteGasto = (gastoId) => gastosApi.delete(`/${gastoId}/`)
