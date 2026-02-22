<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: settingStore.isCollapse ? true : false }"
    >
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          :collapse="settingStore.isCollapse ? true : false"
          text-color="white"
          :default-active="$router.path"
        >
          <Menu :menuList="useStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: settingStore.isCollapse ? true : false }"
    >
      <TabBar />
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: settingStore.isCollapse ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<script setup lang="ts">
import Logo from '@/layout/Logo/index.vue'
import Menu from '@/layout/Menu/index.vue'
import useUserStore from '@/store/modules/user'
import Main from '@/layout/Main/index.vue'
import { useRoute } from 'vue-router'
import TabBar from '@/layout/tabbar/index.vue'
import useLayOutSettingStore from '@/store/modules/setting'
let settingStore = useLayOutSettingStore()
const $router = useRoute()
console.log($router)

const useStore = useUserStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .el-menu {
      border: none;
    }
    &.fold {
      width: $base-menu-min-width;
      transition: all 0.3s;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - #{$base-menu-width});
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - #{$base-menu-min-width});
      left: $base-menu-min-width;
      transition: all 0.3s;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-tabbar-height});
    top: $base-tabbar-height;
    left: $base-menu-width;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #f0f2f5;
    padding: 20px;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - #{$base-menu-min-width});
      left: $base-menu-min-width;
      transition: all 0.3s;
    }
  }
}
</style>
