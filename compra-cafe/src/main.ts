import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'


import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light'
    }
})
// Em desenvolvimento, limpar chaves indesejadas que podem vir de testes antigos
if (import.meta.env.DEV) {
    try {
        const keysToRemove = ['carrinho', 'resumo', 'pagamento']
        keysToRemove.forEach(k => {
            if (localStorage.getItem(k) !== null) {
                console.log('[DEV] Removendo chave de localStorage:', k)
                localStorage.removeItem(k)
            }
        })
    } catch (e) {
        console.warn('[DEV] Não foi possível limpar localStorage:', e)
    }
}

createApp(App).use(vuetify).use(router).mount('#app')
