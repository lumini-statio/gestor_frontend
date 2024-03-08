import axios from 'axios';

const gastosApi = axios.create({
    baseURL: 'https://eluna2003.pythonanywhere.com/gastos/'
})

export const getAllGastos = () => gastosApi.get('/')

export const getGasto = (gastoId) => gastosApi.get(`/${gastoId}/`)

export const deleteGasto = (gastoId) => gastosApi.delete(`/${gastoId}/`)
