import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      isCollapse: false,
      refresh: true,
    }
  },
})

export default useLayOutSettingStore
