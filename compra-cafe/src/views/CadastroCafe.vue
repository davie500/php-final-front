<script lang="ts" setup>
import { ref } from 'vue'
import { CafeService } from '../Controller/api'

const nomeCafe = ref('')
const descricao = ref('')
const preco = ref<number | null>(null)
const estoque = ref<number | null>(null)
const imagem = ref('')
const opcaoSelecionada = ref('')
const loading = ref(false)

interface Opcao { valor: string; texto: string }
const opcoes = ref<Opcao[]>([
  { valor: 'opcao1', texto: 'Starbucks' },
  { valor: 'opcao2', texto: 'Nestlé' },
  { valor: 'opcao3', texto: 'Melitta' }
])

async function cadastrarCafe() {
  if (!nomeCafe.value || !descricao.value || !preco.value || !opcaoSelecionada.value) {
    alert('Preencha todos os campos antes de cadastrar.')
    return
  }

  loading.value = true
  try {
    const payload = {
      nome: nomeCafe.value,
      descricao: descricao.value,
      preco: preco.value,
      opcao: opcaoSelecionada.value
    }

    const { data } = await CafeService.criar(payload)
    console.log('Café cadastrado com sucesso:', data)
    alert('Café cadastrado!')
    resetar()
  } catch (error) {
    console.error('Erro ao cadastrar café:', error)
    alert('Erro ao cadastrar café. Veja console para detalhes.')
  } finally {
    loading.value = false
  }
}

function resetar() {
  nomeCafe.value = ''
  descricao.value = ''
  preco.value = null
  opcaoSelecionada.value = ''
}
</script>

<template>
  <v-container>
    <h1>Cadastro de Cafés</h1>

    <v-form @submit.prevent="cadastrarCafe" ref="formRef">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="nomeCafe" label="Nome do Café" required />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="opcaoSelecionada"
            :items="opcoes"
            item-title="texto"
            item-value="valor"
            label="Escolha a marca"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-textarea v-model="descricao" label="Descrição" rows="3" required />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model.number="preco" label="Preço (R$)" type="number" required />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model.number="estoque" label="Estoque" type="number" required />
        </v-col>
        

        <v-col cols="12" class="d-flex">
          <v-btn color="primary" type="submit" :loading="loading">Cadastrar café</v-btn>
          <v-spacer />
          <v-btn text @click="resetar">Limpar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style scoped>
.v-select, .v-text-field, .v-textarea { width: 100%; }
</style>