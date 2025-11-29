import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import CadastroCafe from '../views/CadastroCafe.vue'
import Cadastro from '../views/Cadastro.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/cadastro-cafe', name: 'CadastroCafe', component: CadastroCafe },
  { path: '/cadastro', name: 'Cadastro', component: Cadastro },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
