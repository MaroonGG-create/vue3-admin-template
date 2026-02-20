<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />

    <p v-show="!settingStore.isCollapse">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
let settingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 15px;
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    color: white;
  }
}
</style>
