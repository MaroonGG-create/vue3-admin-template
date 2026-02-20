<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item
        v-if="item.meta && !item.meta.hidden"
        :index="item.path"
        @click="goRouter"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="item.children[0].meta && !item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRouter"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-sub-menu
      v-if="item.children && item.children.length >= 2"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// 这里的 name 会被用于递归组件调用
defineOptions({
  name: 'Menu',
})

const $router = useRouter()
const props = defineProps<{
  menuList: any[]
}>()

const goRouter = (vc: any) => {
  $router.push(vc.index)
}
</script>

<style scoped lang="scss">
/* 保持简洁，Element Plus 会处理折叠逻辑 */
</style>
