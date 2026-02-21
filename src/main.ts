import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'virtual:svg-icons-register'

import GlobalComponents from './components'
import router from './router'
import pinia from './store'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import './permission'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(GlobalComponents)
app.use(router)
app.use(pinia)
app.mount('#app')
