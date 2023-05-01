import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import '@/style/index.css'
import 'vfonts/Lato.css'
import { key, store } from '@/store'

createApp(App).use(naive).use(store, key).mount('#app')
