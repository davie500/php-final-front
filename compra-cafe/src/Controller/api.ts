import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export const CafeService = {
  listar: () => api.get('/cafes'),
  buscar: (id: number) => api.get(`/cafes/${id}`),
  criar: (data: any) => api.post('/cafes', data),
  excluir: (id: number) => api.delete(`/cafes/${id}`)
}

// ===== SERVIÇOS DE USUÁRIO =====
export const UsuarioService = {
  registro: (data: any) => api.post('/registro', data),
  login: (email: string, senha: string) => api.post('/login', { email, senha }),
  buscar: (id: number) => api.get(`/usuarios/${id}`),
  atualizar: (id: number, data: any) => api.put(`/usuarios/${id}`, data),
  excluir: (id: number) => api.delete(`/usuarios/${id}`),

}

// ===== SERVIÇOS DE PEDIDOS =====
export const PedidoService = {
  listar: () => api.get('/pedidos'),
  obter: (id: number) => api.get(`/pedidos/${id}`),
  criar: (data: any) => api.post('/pedidos', data),
  atualizar: (id: number, data: any) => api.put(`/pedidos/${id}`, data)
}

export default api;