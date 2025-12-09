<script>
    import { api } from '@/services/api';

    export default {
        name: 'Dashboard',
        data() {
            return {
                coffees: []
            };
        },
        async created() {
            try {
                const response = await api.get('/coffees');
                this.coffees = response.data;
            } catch (error) {
                console.error('Erro ao buscar cafés:', error);
            }
        }
    };
</script>

<template>
    <v-container class="pa-6">
        <v-sheet elevation="2" rounded class="pa-8 mb-6" color="deep-purple lighten-5">
            <v-row>
                <v-col cols="12" md="6">
                    <h1 class="display-1">Bem-vindo à Cafeteria dos Eichelberger</h1>
                    <p class="subtitle-1">Explore nossos cafés especiais, assine nosso clube e faça seu pedido hoje mesmo.</p>
                    <v-btn to="/cadastro-cafe" color="primary" class="mt-4" large>Ver Cafés</v-btn>
                </v-col>

                <v-col cols="12" md="6">
                    <v-img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop" aspect-ratio="1.6" class="rounded-lg"></v-img>
                </v-col>
            </v-row>
        </v-sheet>

        <h2 class="headline mb-4">Destaques</h2>
        <v-row dense>
            <v-col cols="12" md="4" v-for="coffee in coffees" :key="coffee.id">
                <v-card elevation="2" class="h-100">
                    <v-img :src="coffee.image" height="180px" />
                    <v-card-title>{{ coffee.name }}</v-card-title>
                    <v-card-text class="text--secondary">{{ coffee.desc }}</v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary" :to="coffee.link">Detalhes</v-btn>
                        <v-spacer />
                        <v-btn color="primary" :to="'/cadastro-cafe'">Pedir</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'

const coffees = ref([
    { id: 1, name: 'Espresso Clássico', desc: 'Intenso e encorpado — perfeito para começar o dia.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop', link: '/cadastro-cafe' },
    { id: 2, name: 'Cappuccino Cremoso', desc: 'Espuma aveludada com cacau polvilhado.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop', link: '/cadastro-cafe' },
    { id: 3, name: 'Latte Aromático', desc: 'Suave com notas de baunilha e caramelo.', image: 'https://images.unsplash.com/photo-1524182576063-7a0d3b8e7d5a?q=80&w=800&auto=format&fit=crop', link: '/cadastro-cafe' },
])
</script>
