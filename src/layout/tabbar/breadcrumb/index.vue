<template>
  <div class="tabbar_breadcrumb">
    <div style="margin-right: 10px">
      <el-icon @click="changeIcon">
        <component
          :is="settingStore.isCollapse ? 'Fold' : 'Expand'"
        ></component>
      </el-icon>
    </div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in router.matched"
          v-show="item.meta.title"
          :key="item.path"
          :to="item.path"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以写你的业务逻辑
import useLayOutSettingStore from '@/store/modules/setting'
let settingStore = useLayOutSettingStore()
import { useRoute } from 'vue-router'
const router = useRoute()
const changeIcon = () => {
  console.log(router.matched)

  settingStore.isCollapse = !settingStore.isCollapse
}
</script>

<style scoped lang="scss">
.tabbar_breadcrumb {
  display: flex;
  align-items: center; // 确保容器内的 div 垂直居中
  height: 50px;
  padding: 0 10px;

  // 针对包裹图标的 div 和包裹面包屑的 div
  & > div {
    display: flex;
    align-items: center;
  }
}
</style>
