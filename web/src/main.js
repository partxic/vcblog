import { createApp } from 'vue'
import App from '@/App.vue'
const app = createApp(App)

import router from '@/router.js'
app.use(router)

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import '@/global.css'
app.mount('#app')
