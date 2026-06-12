import { createApp } from 'vue'
import App from '@/App.vue'
const app = createApp(App)

import router from '@/router.js'
app.use(router)

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import { config } from 'md-editor-v3'
config({
    codeMirrorExtensions(extensions) {
        return extensions.map(item => {
            if (item.type === 'linkShortener') {
                return {
                    ...item,
                    options: {
                        maxLength: 100,
                        shortenText: url => url
                    }
                }
            }

            return item
        })
    }
})

import '@/global.css'
app.mount('#app')
