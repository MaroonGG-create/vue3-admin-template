import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const count = 100

const fn = () => {
  console.log(count)
}
fn()
