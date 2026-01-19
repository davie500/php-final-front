<template>
  <v-container class="admin-panel-container">
    <h1 class="admin-title">Painel de Admin</h1>
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex">
        <v-btn :color="tab === 'usuarios' ? 'primary' : undefined" @click="select('usuarios')">Usuários</v-btn>
        <v-btn :color="tab === 'filas' ? 'primary' : undefined" @click="select('filas')">Fila</v-btn>
        <v-btn :color="tab === 'cafes' ? 'primary' : undefined" @click="select('cafes')">Cafés</v-btn>
        <v-spacer />
        <v-btn text @click="refresh">Atualizar</v-btn>
        <v-btn color="secondary" class="ml-2" @click="voltarDashboard">Voltar para Dashboard</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div v-if="tab === 'usuarios'">
          <h3 class="section-title">Usuários</h3>
          <v-simple-table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in usuarios" :key="u.id">
                <td>{{ u.id }}</td>
                <td>{{ u.nome }}</td>
                <td>{{ u.email }}</td>
                <td>
                  <v-btn small color="error" @click="deletarUsuario(u.id)">Excluir</v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <div v-if="usuarios.length === 0" class="empty-state">Nenhum usuário encontrado.</div>
        </div>
        <div v-if="tab === 'filas'">
          <h3 class="section-title">Fila de Café</h3>
          <v-simple-table class="admin-table">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Usuário</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(f, idx) in filas" :key="f.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ f.usuario?.nome || f.usuario_id }}</td>
                <td>{{ f.status }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <div v-if="filas.length === 0" class="empty-state">Nenhuma fila encontrada.</div>
        </div>
        <div v-if="tab === 'cafes'">
          <h3 class="section-title">Cafés</h3>
          <v-simple-table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cafe in cafes" :key="cafe.id">
                <td>{{ cafe.id }}</td>
                <td>{{ cafe.nome }}</td>
                <td>{{ cafe.marca }}</td>
                <td>R$ {{ cafe.preco }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <div v-if="cafes.length === 0" class="empty-state">Nenhum café encontrado.</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { UsuarioService, FilaService, CafeService } from '../Controller/api'
import { usuario, initAuthFromStorage } from '../stores/auth'

const tab = ref('usuarios')
const usuarios = ref<any[]>([])
const filas = ref<any[]>([])
const cafes = ref<any[]>([])
const router = useRouter()

onMounted(() => {
  initAuthFromStorage()
  if (!usuario.value || !usuario.value.admin) {
    router.push('/')
    return
  }
  loadCurrent()
})

function select(t: string) {
  tab.value = t
  loadCurrent()
}

function voltarDashboard() {
  router.push('/')
}

async function loadUsuarios() {
  try {
    const { data } = await UsuarioService.listar()
    usuarios.value = data?.data || data || []
  } catch (e) {
    console.error('Erro ao buscar usuários', e)
    usuarios.value = []
  }
}

async function loadFilas() {
  try {
    const { data } = await FilaService.listar()
    filas.value = data?.data || data || []
  } catch (e) {
    console.warn('/fila não disponível ou erro', e)
    filas.value = []
  }
}

async function loadCafes() {
  try {
    const { data } = await CafeService.listar()
    cafes.value = data?.data || data || []
  } catch (e) {
    console.error('Erro ao buscar cafés', e)
    cafes.value = []
  }
}

async function loadCurrent() {
  if (tab.value === 'usuarios') await loadUsuarios()
  if (tab.value === 'filas') await loadFilas()
  if (tab.value === 'cafes') await loadCafes()
}

async function deletarUsuario(id: number) {
  if (!confirm('Confirmar exclusão do usuário?')) return
  try {
    await UsuarioService.excluir(id)
    await loadUsuarios()
  } catch (e) {
    console.error('Erro ao excluir usuário', e)
    alert('Erro ao excluir usuário. Veja console.')
  }
}

function refresh() {
  loadCurrent()
}
</script>

<style scoped>
.admin-panel-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 2rem;
}
.admin-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #764ba2;
  margin-bottom: 2rem;
  text-align: center;
}
.section-title {
  font-size: 1.3rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 700;
}
.admin-table {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}
.empty-state {
  text-align: center;
  color: #9ca3af;
  font-size: 1rem;
  margin-top: 1.5rem;
}
</style>
