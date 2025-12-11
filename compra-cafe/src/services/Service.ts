import axios, { AxiosInstance } from 'axios'

// Configurar baseURL para Laravel (ajuste conforme sua URL)
const api: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

export default api;