import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import CadastroCafe from '../views/CadastroCafe.vue'
import CafeDetalhes from '../views/CafeDetalhes.vue'
import Cadastro from '../views/Login/Registro/Cadastro.vue'
import Login from '../views/Login/Registro/Login.vue'
import Admin from '../views/AdminPanel.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/cadastro-cafe', name: 'CadastroCafe', component: CadastroCafe },
  { path: '/cafe/:id', name: 'CafeDetalhes', component: CafeDetalhes },
  { path: '/cadastro', name: 'Cadastro', component: Cadastro },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin', name: 'Admin', component: Admin },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
