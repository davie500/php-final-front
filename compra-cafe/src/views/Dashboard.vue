<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard-container">
    <!-- Header Premium -->
    <div class="header-section">
      <div class="header-content">
        <div class="header-text">
          <h1 class="header-title">Café & Fila</h1>
          <p class="header-subtitle">Gerencie sua vez de comprar café</p>
        </div>
      </div>
    </div>

    <!-- Card de posição na fila -->
    <div v-if="minhaPosicao !== null" class="fila-posicao-info">
      <strong>Sua posição na fila:</strong> {{ minhaPosicao }}
      <span v-if="minhaPosicao > 1"> (aguarde {{ minhaPosicao - 1 }} pessoas)</span>
      <span v-else> (é sua vez de comprar!)</span>
    </div>
    <div v-else class="fila-posicao-info">
      <strong>Você não está na fila.</strong>
    </div>

    <!-- Card do próximo da fila -->
    <div v-if="proximoFila" class="proximo-fila-card">
      <strong>Próximo da fila:</strong> {{ proximoFila.nome }}
    </div>

    <!-- Users Table Section -->
    <div class="users-section">
      <div class="section-header">
        <h2 class="section-title">👥 Usuários</h2>
        <p class="section-description">Lista de todos os usuários cadastrados</p>
      </div>
      <div class="table-wrapper">
        <table class="users-table">
          <thead>
            <tr>
              <th><span class="th-content">👤 Nome</span></th>
              <th><span class="th-content">Email</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usuarios" :key="u.id" class="user-row">
              <td class="user-name">{{ u.nome }}</td>
              <td>{{ u.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Lista de Cafés à venda -->
    <div class="cafes-section">
      <div class="section-header">
        <h2 class="section-title">☕ Cafés à venda</h2>
      </div>
      <div class="cafes-list">
        <div v-for="cafe in cafes" :key="cafe.id" class="cafe-card">
          <div class="cafe-info">
            <h3 class="cafe-nome">{{ cafe.nome }}</h3>
            <p class="cafe-marca">Marca: {{ cafe.marca }}</p>
            <p class="cafe-preco">Preço: <strong>R$ {{ cafe.preco }}</strong></p>
          </div>
          <div class="cafe-actions">
            <button class="btn-ver" @click="verCafe(cafe.id)">Ver detalhes</button>
            <button class="btn-comprar" :disabled="!podeComprar || comprando" @click="comprarCafe(cafe.id)">Comprar</button>
          </div>
        </div>
        <div v-if="cafes.length === 0" class="empty-state">Nenhum café cadastrado.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { FilaService, UsuarioService, CafeService } from '../Controller/api'
import { usuario, initAuthFromStorage } from '../stores/auth'
import { useRouter } from 'vue-router'

const fila = ref<any[]>([])
const usuarios = ref<any[]>([])
const minhaPosicao = ref<number | null>(null)
const proximoFila = ref<any | null>(null)
const cafes = ref<any[]>([])
const router = useRouter()

const podeComprar = computed(() => minhaPosicao.value === 1)
const comprando = ref(false)

function verCafe(id: number) {
  router.push(`/cafe/${id}`)
}

async function comprarCafe(id: number) {
  if (!podeComprar.value || comprando.value) return
  comprando.value = true
  try {
    await CafeService.comprar(id)
    alert('Compra registrada com sucesso!')
    const filaRes = await FilaService.listar()
    fila.value = filaRes.data.data
    proximoFila.value = fila.value[0]?.usuario || null
    if (usuario.value) {
      const idx = fila.value.findIndex(f => f.usuario_id === usuario.value.id)
      minhaPosicao.value = idx >= 0 ? idx + 1 : null
    }
  } catch (e) {
    alert('Erro ao registrar compra!')
  } finally {
    comprando.value = false
  }
}

onMounted(async () => {
  initAuthFromStorage()
  const filaRes = await FilaService.listar()
  fila.value = filaRes.data.data
  proximoFila.value = fila.value[0]?.usuario || null
  if (usuario.value) {
    const idx = fila.value.findIndex(f => f.usuario_id === usuario.value.id)
    minhaPosicao.value = idx >= 0 ? idx + 1 : null
  }
  const usuariosRes = await UsuarioService.listar()
  usuarios.value = usuariosRes.data.data
  const cafesRes = await CafeService.listar()
  cafes.value = cafesRes.data.data
})
</script>

<style scoped>
.dashboard-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 2rem;
}
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1.5rem;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}
.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-text {
  color: white;
}
.header-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
}
.header-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 0 0;
}
.fila-posicao-info {
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #ad8b00;
  text-align: center;
}
.proximo-fila-card {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 1rem;
  padding: 1.2rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #1890ff;
  text-align: center;
}
.users-section {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.section-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
}
.section-title {
  font-size: 1.25rem;
  color: #1f2937;
  margin: 0;
  font-weight: 700;
}
.section-description {
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0.5rem 0 0 0;
}
.table-wrapper {
  overflow-x: auto;
}
.users-table {
  width: 100%;
  border-collapse: collapse;
}
.users-table thead {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
}
.users-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 700;
  color: #6b7280;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e5e7eb;
}
.th-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.user-row {
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.2s ease;
}
.user-row:hover {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
}
.users-table td {
  padding: 1.25rem 1rem;
  color: #1f2937;
  font-size: 0.95rem;
}
.user-name {
  font-weight: 600;
  color: #1f2937;
}
.cafes-section {
  background: #fff;
  border-radius: 1.5rem;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  border: 1px solid #e5e7eb;
}
.cafes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.cafe-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.07);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  min-width: 260px;
  max-width: 320px;
  flex: 1 1 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cafe-info {
  margin-bottom: 1rem;
}
.cafe-nome {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.cafe-marca, .cafe-preco {
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}
.cafe-actions {
  display: flex;
  gap: 0.75rem;
}
.btn-ver {
  background: #e6f7ff;
  color: #1890ff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-ver:hover {
  background: #bae7ff;
}
.btn-comprar {
  background: #764ba2;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-comprar:disabled {
  background: #e5e7eb;
  color: #bdbdbd;
  cursor: not-allowed;
}
</style>
