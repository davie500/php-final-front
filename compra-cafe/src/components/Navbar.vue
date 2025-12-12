<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Café dos Eichelberger</v-toolbar-title>
    <v-spacer />
    <v-btn to="/" text>Dashboard</v-btn>
    <v-btn to="/cadastro-cafe" text>Cadastro de Cafés</v-btn>

    <!-- Mostrar Menu de Usuário (se autenticado) ou Botões de Cadastro/Login (se não) -->
    <template v-if="usuarioAutenticado && usuario">
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" text>
            <v-avatar size="32" color="secondary">
              <span class="text-white font-weight-bold">{{ iniciais }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="font-weight-bold">{{ usuario.nome }}</v-list-item-title>
            <v-list-item-subtitle>{{ usuario.email }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item>
            <template #prepend>
              <v-icon>mdi-account</v-icon>
            </template>
            <v-list-item-title>Meu Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <v-icon>mdi-history</v-icon>
            </template>
            <v-list-item-title>Meus Pedidos</v-list-item-title>
          </v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item @click="logout">
            <template #prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-else>
      <v-btn to="/cadastro" text>Cadastro</v-btn>
      <v-btn to="/login" text>Login</v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usuario, initAuthFromStorage, clearUser } from '../stores/auth'

const router = useRouter()

// usuário reativo vindo do store
const usuarioRef = usuario
const isAuthenticated = ref(false)
const usuarioAutenticado = computed(() => isAuthenticated.value)

// Calcula as iniciais do nome
const iniciais = computed(() => {
  if (!usuarioRef.value?.nome) return 'U'
  return usuarioRef.value.nome
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

function onAuthChanged() {
  initAuthFromStorage()
}

onMounted(() => {
  initAuthFromStorage()
  // inicializa flag de autenticação
  isAuthenticated.value = !!localStorage.getItem('auth_token') && !!usuarioRef.value
  // observa mudanças diretas no store
  watch(usuarioRef, (val) => {
    isAuthenticated.value = !!localStorage.getItem('auth_token') && !!val
  })
  window.addEventListener('auth-changed', onAuthChanged)
})

onUnmounted(() => {
  window.removeEventListener('auth-changed', onAuthChanged)
})

// Função de logout
function logout() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('usuario')
  clearUser()
  // notifica a aplicação que o estado auth mudou
  window.dispatchEvent(new Event('auth-changed'))
  router.push('/login')
}
</script>

<style scoped>
.v-avatar {
  cursor: pointer;
}
</style>
