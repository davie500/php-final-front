import axios, { AxiosInstance } from 'axios'

// Configurar baseURL para Laravel (ajuste conforme sua URL)
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Para CSRF e cookies
})

// Interceptor para adicionar token de autenticação (se usar JWT/Bearer)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Interceptor para erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ===== SERVIÇOS DE CAFÉ =====
export const CafeService = {
  listar: () => api.get('/cafes'),
  obter: (id: number) => api.get(`/cafes/${id}`),
  criar: (data: any) => api.post('/cafes', data),
  atualizar: (id: number, data: any) => api.put(`/cafes/${id}`, data),
  excluir: (id: number) => api.delete(`/cafes/${id}`)
}

// ===== SERVIÇOS DE USUÁRIO =====
export const UsuarioService = {
  registro: (data: any) => api.post('/auth/register', data),
  login: (email: string, senha: string) => api.post('/auth/login', { email, senha }),
  atualizar: (data: any) => api.put('/user/profile', data)
}

// ===== SERVIÇOS DE PEDIDOS =====
export const PedidoService = {
  listar: () => api.get('/pedidos'),
  obter: (id: number) => api.get(`/pedidos/${id}`),
  criar: (data: any) => api.post('/pedidos', data),
  atualizar: (id: number, data: any) => api.put(`/pedidos/${id}`, data)
}

export default api