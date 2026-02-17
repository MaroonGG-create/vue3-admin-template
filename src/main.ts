import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
const app = createApp(App)
import GlobalComponents from './components'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(GlobalComponents)
app.use(router)
app.mount('#app')
