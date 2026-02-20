<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './Setting/index.vue'
// 这里可以写你的业务逻辑
</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
}
</style>
