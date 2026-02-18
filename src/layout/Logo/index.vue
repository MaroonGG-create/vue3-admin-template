<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />

    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 40px;
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
