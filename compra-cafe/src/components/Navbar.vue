<template>
  <v-app-bar app color="#1a1a2e" dark elevation="4" class="navbar-elegant">
    <v-container fluid class="d-flex align-center justify-space-between">
      <!-- Logo e Branding -->
      <v-row align="center" no-gutters class="flex-grow-0">
        <v-col cols="auto">
          <div class="logo-wrapper">
            <v-avatar size="44" class="mr-3 shadow-lg" color="primary">
              <v-img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=200&auto=format&fit=crop" alt="Logo" />
            </v-avatar>
          </div>
        </v-col>

        <v-col>
          <div class="branding">
            <v-toolbar-title class="ma-0 pa-0 font-weight-bold" style="font-size: 1.2rem; letter-spacing: 0.5px;">
              ☕ Café dos Eichelberger
            </v-toolbar-title>
            <p class="ma-0 pa-0 text-caption" style="opacity: 0.8;">Qualidade artesanal desde 2020</p>
          </div>
        </v-col>
      </v-row>

      <v-spacer />

      <!-- Menu de Navegação Desktop -->
      <v-row align="center" no-gutters class="d-none d-md-flex flex-grow-0">
        <v-col cols="auto">
          <v-btn to="/" variant="text" class="mx-1 nav-btn">
            <v-icon size="20" start>mdi-home</v-icon>
            Dashboard
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn to="/cadastro-cafe" variant="text" class="mx-1 nav-btn">
            <v-icon size="20" start>mdi-coffee</v-icon>
            Catálogo
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn to="/cadastro" variant="text" class="mx-1 nav-btn">
            <v-icon size="20" start>mdi-account-plus</v-icon>
            Cadastro
          </v-btn>
        </v-col>
      </v-row>

      <!-- Ícones de Ação -->
      <v-row align="center" no-gutters class="flex-grow-0 ml-2">
        <!-- Carrinho de Compras -->
        <v-col cols="auto">
          <v-badge color="deep-orange" content="3" overlap>
            <v-btn icon variant="plain" class="icon-btn">
              <v-icon size="24">mdi-shopping-cart</v-icon>
            </v-btn>
          </v-badge>
        </v-col>

        <!-- Menu de Usuário -->
        <v-col cols="auto">
          <v-menu>
            <template #activator="{ props }">
              <v-btn icon v-bind="props" variant="plain" class="icon-btn ml-1">
                <v-avatar size="32" color="primary">
                  <span class="text-white font-weight-bold">JD</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-list width="220">
              <v-list-item>
                <template #prepend>
                  <v-icon>mdi-account-circle</v-icon>
                </template>
                <v-list-item-title>Meu Perfil</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon>mdi-heart</v-icon>
                </template>
                <v-list-item-title>Favoritos</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon>mdi-history</v-icon>
                </template>
                <v-list-item-title>Pedidos</v-list-item-title>
              </v-list-item>
              <v-divider class="my-2"></v-divider>
              <v-list-item>
                <template #prepend>
                  <v-icon>mdi-logout</v-icon>
                </template>
                <v-list-item-title>Sair</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <!-- Menu Mobile -->
        <v-col cols="auto" class="d-md-none ml-1">
          <v-menu>
            <template #activator="{ props }">
              <v-btn icon v-bind="props" variant="plain" class="icon-btn">
                <v-icon size="24">mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list width="250">
              <v-list-item to="/">
                <template #prepend>
                  <v-icon>mdi-home</v-icon>
                </template>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item>
              <v-list-item to="/cadastro-cafe">
                <template #prepend>
                  <v-icon>mdi-coffee</v-icon>
                </template>
                <v-list-item-title>Catálogo</v-list-item-title>
              </v-list-item>
              <v-list-item to="/cadastro">
                <template #prepend>
                  <v-icon>mdi-account-plus</v-icon>
                </template>
                <v-list-item-title>Cadastro</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.navbar-elegant {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.logo-wrapper {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-wrapper:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 8px rgba(63, 81, 181, 0.6));
}

.branding {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.2;
}

.nav-btn {
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.nav-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3f51b5, #ff9800);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-btn:hover::after {
  width: 70%;
}

.nav-btn:hover {
  transform: translateY(-2px);
}

.icon-btn {
  transition: all 0.3s ease;
}

.icon-btn:hover {
  transform: scale(1.1) rotate(5deg);
  color: #ff9800;
}
</style>
