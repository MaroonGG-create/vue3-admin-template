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
    <el-button type="primary" circle size="small" :icon="Setting" />
    <img :src="userStore.avatar" alt="" />
    <el-dropdown>
      <span class="el-dropdown-link" style="cursor: pointer">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()
import { useRouter } from 'vue-router'
const $router = useRouter()
import { useRoute } from 'vue-router'
const $route = useRoute()
// 这里可以写你的业务逻辑
const updateRefsh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  //切换成全屏
  if (!full) {
    //文档根节点的方法requestFullscreen实现全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}

const logout = () => {
  userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped lang="scss">
.header-right {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>
