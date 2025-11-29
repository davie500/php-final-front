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