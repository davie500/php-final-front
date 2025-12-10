<script>
    import { api } from '@/Controller/api';

    export default {
        name: 'Cadastro',
        data() {
            return {
                nome: '',
                email: '',
                senha: ''
            };
        },
        methods: {
            async cadastrar() {
                try {
                    const response = await api.post('/usuarios', {
                        nome: this.nome,
                        email: this.email,
                        senha: this.senha
                    });
                    console.log('Usuário cadastrado com sucesso:', response.data);
                } catch (error) {
                    console.error('Erro ao cadastrar usuário:', error);
                }
            }
        }
    };
</script>

<template>
    <v-container>
        <h1>Cadastro</h1>
        <br>
        <v-form>
            <v-text-field label="Nome" required></v-text-field>
            <v-text-field label="Email" type="email" required></v-text-field>
            <v-text-field label="Senha" type="password" required></v-text-field>
            <v-btn color="primary" type="submit">Cadastrar</v-btn>
        </v-form>
    </v-container>
</template>