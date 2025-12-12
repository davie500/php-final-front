<template>
  <v-container>
    <h1>Painel de Admin</h1>

    <v-row class="mb-4">
      <v-col cols="12" class="d-flex">
        <v-btn :color="tab === 'compras' ? 'primary' : undefined" @click="select('compras')">Compras</v-btn>
        <v-btn :color="tab === 'usuarios' ? 'primary' : undefined" @click="select('usuarios')">Usuários</v-btn>
        <v-btn :color="tab === 'filas' ? 'primary' : undefined" @click="select('filas')">Filas</v-btn>
        <v-spacer />
        <v-btn text @click="refresh">Atualizar</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div v-if="tab === 'compras'">
          <h3>Compras</h3>
          <v-simple-table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Itens</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pedido in compras" :key="pedido.id">
                <td>{{ pedido.id }}</td>
                <td>{{ pedido.usuario?.nome || pedido.usuario_id }}</td>
                <td>{{ pedido.itens?.length || pedido.itens }}</td>
                <td>{{ pedido.status || '—' }}</td>
                <td>
                  <v-btn small @click="toggleStatus(pedido)">Toggle Status</v-btn>
                  <v-btn small color="error" @click="deletarPedido(pedido.id)">Excluir</v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <div v-if="compras.length === 0">Nenhuma compra encontrada.</div>
        </div>

        <div v-if="tab === 'usuarios'">
          <h3>Usuários</h3>
          <v-simple-table>
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
          <div v-if="usuarios.length === 0">Nenhum usuário encontrado.</div>
        </div>

        <div v-if="tab === 'filas'">
          <h3>Filas</h3>
          <div v-if="filas.length === 0">Nenhuma fila encontrada ou endpoint /filas indisponível.</div>
          <v-simple-table v-else>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="f in filas" :key="f.id">
                <td>{{ f.id }}</td>
                <td>{{ f.nome || f.label || f.title }}</td>
                <td>{{ f.status || '—' }}</td>
                <td>
                  <v-btn small @click="atualizarFila(f)">Atualizar</v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { PedidoService, UsuarioService, api } from '../Controller/api'

const tab = ref('compras')
const compras = ref<any[]>([])
const usuarios = ref<any[]>([])
const filas = ref<any[]>([])

function select(t: string) {
  tab.value = t
  loadCurrent()
}

async function loadCompras() {
  try {
    const { data } = await PedidoService.listar()
    compras.value = data?.data || data || []
  } catch (e) {
    console.error('Erro ao buscar compras', e)
    compras.value = []
  }
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
    const { data } = await api.get('/filas')
    filas.value = data?.data || data || []
  } catch (e) {
    console.warn('/filas não disponível ou erro', e)
    filas.value = []
  }
}

async function loadCurrent() {
  if (tab.value === 'compras') await loadCompras()
  if (tab.value === 'usuarios') await loadUsuarios()
  if (tab.value === 'filas') await loadFilas()
}

onMounted(() => {
  loadCurrent()
})

function refresh() {
  loadCurrent()
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

async function deletarPedido(id: number) {
  if (!confirm('Confirmar exclusão do pedido?')) return
  try {
    await PedidoService.atualizar(id, { status: 'cancelado' })
    await loadCompras()
  } catch (e) {
    console.error('Erro ao atualizar pedido', e)
    alert('Erro ao atualizar pedido. Veja console.')
  }
}

async function toggleStatus(pedido: any) {
  const novo = pedido.status === 'pronto' ? 'pendente' : 'pronto'
  try {
    await PedidoService.atualizar(pedido.id, { status: novo })
    await loadCompras()
  } catch (e) {
    console.error('Erro ao alternar status', e)
  }
}

async function atualizarFila(fila: any) {
  try {
    // tentativa genérica: PUT /filas/:id
    await api.put(`/filas/${fila.id}`, fila)
    await loadFilas()
  } catch (e) {
    console.error('Erro ao atualizar fila', e)
    alert('Erro ao atualizar fila. Veja console.')
  }
}
</script>

<style scoped>
h1 { margin-bottom: 16px }
</style>
