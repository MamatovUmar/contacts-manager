import './assets/styles/main.scss'
import UUID from 'vue3-uuid'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import clickOutsideDirective from './utils/click-outside'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(UUID)
app.directive('click-outside', clickOutsideDirective)

app.mount('#app')
