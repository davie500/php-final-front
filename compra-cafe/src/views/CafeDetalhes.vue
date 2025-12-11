<!-- <script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CafeService } from '../Controller/api'

</script> -->

<template>
  <v-container class="pa-6">
    <v-btn to="/" icon class="mb-4">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <div v-if="loading" class="text-center pa-8">
      <v-progress-circular indeterminate color="primary" />
      <p class="mt-4">Carregando café...</p>
    </div>

    <div v-else-if="cafe">
      <v-row>
        <!-- Imagem do Café -->
        <v-col cols="12" md="6">
          <v-card>
            <v-img :src="cafe.image || cafe.imagem || placeholder" height="400px" />
          </v-card>
        </v-col>

        <!-- Detalhes -->
        <v-col cols="12" md="6">
          <h1 class="display-1 mb-4">{{ cafe.name || cafe.nome }}</h1>

          <p class="text-h6 mb-2">Descrição</p>
          <p class="text-body1 mb-6">{{ cafe.desc || cafe.descricao || cafe.description }}</p>

          <v-divider class="my-4"></v-divider>

          <p class="text-h5 font-weight-bold mb-4">
            R$ {{ formatPrice(cafe.price || cafe.preco) }}
          </p>

          <p v-if="cafe.created_at" class="text-caption text-grey">
            Adicionado em: {{ formatDate(cafe.created_at) }}
          </p>

          <v-divider class="my-4"></v-divider>

          <!-- Quantidade e Ações -->
          <v-row class="align-center">
            <v-col cols="auto">
              <label class="text-body2">Quantidade:</label>
            </v-col>
            <v-col cols="auto">
              <v-btn-group>
                <v-btn icon size="small" @click="quantidade = Math.max(1, quantidade - 1)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn flat>{{ quantidade }}</v-btn>
                <v-btn icon size="small" @click="quantidade++">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-btn-group>
            </v-col>
          </v-row>

          <v-row class="mt-6">
            <v-col>
              <v-btn color="primary" size="large" block @click="adicionarAoCarrinho">
                <v-icon start>mdi-shopping-cart</v-icon>
                Adicionar ao Carrinho
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col>
              <v-btn variant="outlined" color="primary" size="large" block @click="adicionarAosFavoritos">
                <v-icon start>mdi-heart-outline</v-icon>
                Adicionar aos Favoritos
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center pa-8">
      <p class="text-h6">Café não encontrado.</p>
      <v-btn to="/" class="mt-4">Voltar ao Dashboard</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CafeService } from '../Controller/api'

const route = useRoute()
const cafe = ref<any>(null)
const loading = ref(false)
const quantidade = ref(1)
const placeholder = 'https://via.placeholder.com/400x400?text=Café'

onMounted(async () => {
  const cafeId = route.params.id as string
  if (!cafeId) return

  loading.value = true
  try {
    const res = await CafeService.obter(parseInt(cafeId))
    cafe.value = res.data?.data ?? res.data
  } catch (err) {
    console.error('Erro ao carregar café:', err)
    cafe.value = null
  } finally {
    loading.value = false
  }
})

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString))
}

function adicionarAoCarrinho() {
  alert(`Adicionado ${quantidade.value}x "${cafe.value.name || cafe.value.nome}" ao carrinho!`)
  // TODO: implementar lógica real de carrinho (store/context)
}

function adicionarAosFavoritos() {
  alert(`"${cafe.value.name || cafe.value.nome}" adicionado aos favoritos!`)
  // TODO: implementar lógica real de favoritos (backend)
}
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
