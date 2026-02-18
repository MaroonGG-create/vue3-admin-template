import type { App, Component } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponents: { [name: string]: Component } = {
  SvgIcon,
}
export default {
  // 导入组件
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key] as Component)
      for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
      }
    })
  },
}
