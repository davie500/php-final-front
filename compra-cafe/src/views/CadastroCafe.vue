<template>
    <v-container>
        <h1>Cadastro de Cafés</h1>
        <v-form>
            <v-text-field label="Nome do Café" required></v-text-field>
            <div>
                <label for="selecao">Escolha uma opção:</label>
                <select id="selecao" v-model="opcaoSelecionada">
                <option disabled value="">Selecione um item</option>
                <option v-for="opcao in opcoes" :value="opcao.valor" :key="opcao.valor">
                    {{ opcao.texto }}
                </option>
                </select>
            </div>
            <br>
            <v-text-field label="Descrição" required></v-text-field>
            <v-text-field label="Preço" type="number" required></v-text-field>
            <v-btn color="primary" type="submit">Cadastrar</v-btn>
        </v-form>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Opcao {
  valor: string;
  texto: string;
}

const opcaoSelecionada = ref<string>('');
const opcoes = ref<Opcao[]>([
  { valor: 'opcao1', texto: 'Starbucks' },
  { valor: 'opcao2', texto: 'Nestlé' },
  { valor: 'opcao3', texto: 'Melitta' }
]);
</script>

<style scoped>
select {
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  /* Estilos adicionais */
}
</style>