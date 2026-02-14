import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'virtual:svg-icons-register'
const app = createApp(App)
import GlobalComponents from './components'

import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(GlobalComponents)
app.mount('#app')
