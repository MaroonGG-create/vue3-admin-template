<template>
  <div class="header-right">
    <el-button
      type="primary"
      circle
      size="small"
      :icon="Refresh"
      @click="updateRefsh"
    />
    <el-button
      type="primary"
      circle
      size="small"
      :icon="FullScreen"
      @click="fullScreen"
    />
  </div>
</template>

<script setup lang="ts">
import { Refresh, FullScreen } from '@element-plus/icons-vue'
// 这里可以写你的业务逻辑
const updateRefsh = () => {}
const fullScreen = () => {}
</script>

<style scoped lang="scss">
.header-right {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
}
</style>
