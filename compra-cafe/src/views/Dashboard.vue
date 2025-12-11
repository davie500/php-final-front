<template>
    <v-container class="pa-6">
        <v-sheet elevation="2" rounded class="pa-8 mb-6" color="deep-purple lighten-5">
            <v-row>
                <v-col cols="12" md="6">
                    <h1 class="display-1">Bem-vindo à Cafeteria dos Eichelberger</h1>
                    <p class="subtitle-1">Explore nossos cafés especiais e faça seu pedido hoje mesmo.</p>
                    <v-btn to="/cadastro-cafe" color="primary" class="mt-4" large>Ver Catálogo</v-btn>
                </v-col>

                <v-col cols="12" md="6">
                    <v-img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop" aspect-ratio="1.6" class="rounded-lg"></v-img>
                </v-col>
            </v-row>
        </v-sheet>

        <div v-if="loading" class="text-center pa-8">
            <v-progress-circular indeterminate color="primary" />
            <p class="mt-4">Carregando cafés...</p>
        </div>

        <div v-else-if="cafes.length > 0">
            <h2 class="headline mb-4">Nossos Cafés</h2>
            <v-row dense>
                <v-col cols="12" md="4" v-for="cafe in cafes" :key="cafe.id">
                    <v-card elevation="2" class="h-100">
                        <v-img :src="cafe.image || placeholder" height="180px" />
                        <v-card-title>{{ cafe.name || cafe.nome }}</v-card-title>
                        <v-card-text class="text--secondary">{{ cafe.desc || cafe.descricao || cafe.description }}</v-card-text>
                        <v-card-text v-if="cafe.price || cafe.preco" class="font-weight-bold">R$ {{ formatPrice(cafe.price || cafe.preco) }}</v-card-text>
                        <v-card-actions>
                            <v-btn text color="primary" @click="router.push(`/cafe/${cafe.id}`)">Detalhes</v-btn>
                            <v-spacer />
                            <v-btn color="primary">Adicionar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <div v-else class="text-center pa-8">
            <p class="text-h6">Nenhum café encontrado. Verifique o backend.</p>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CafeService } from '@/Controller/api'

const router = useRouter()

const cafes = ref<any[]>([])
const loading = ref(false)
const placeholder = 'https://via.placeholder.com/400x200?text=Café'

onMounted(async () => {
    loading.value = true
    try {
        const res = await CafeService.listar()
        // backend pode retornar data (wrapper) ou um array direto
        cafes.value = res.data?.data ?? res.data ?? []
    } catch (err) {
        console.error('Erro ao carregar cafés:', err)
        cafes.value = []
    } finally {
        loading.value = false
    }
})

function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)
}
</script>
