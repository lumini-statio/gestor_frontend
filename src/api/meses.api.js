import axios from 'axios';

const mesesApi = axios.create({
    baseURL: 'https://eluna2003.pythonanywhere.com/meses/'
})

export const getAllMeses = () => mesesApi.get('/')

export const getMes = (mesId) => mesesApi.get(`/${mesId}/`)

export const deleteMes = (mesId) => mesesApi.delete(`/${mesId}/`)

export const actualizarMes = (mesId, mes) => mesesApi.put(`/${mesId}/`, mes)