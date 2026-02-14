import type { App, Component } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
const allGlobalComponents: { [name: string]: Component } = {
  SvgIcon,
}
export default {
  // 导入组件
  install(app: App) {
    Object.keys(allGlobalComponents).forEach((key) => {
      console.log(allGlobalComponents[key])

      app.component(key, allGlobalComponents[key] as Component)
    })
  },
}
