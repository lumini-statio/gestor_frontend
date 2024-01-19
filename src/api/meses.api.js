import axios from 'axios';

const mesesApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/meses/'
})

export const getAllMeses = () => mesesApi.get('/')

export const getMes = (mesId) => mesesApi.get(`/${mesId}/`)

export const deleteMes = (mesId) => mesesApi.delete(`/${mesId}/`)

export const actualizarMes = (mesId, mes) => mesesApi.put(`/${mesId}/`, mes)