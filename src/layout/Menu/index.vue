<template>
  <div>
    <template v-for="item in menuList">
      <template v-if="!item.children">
        <el-menu-item
          v-if="item.meta && !item.meta.hidden"
          :index="item.path"
          :key="item.path"
          @click="goRouter"
        >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          v-if="item.meta && !item.meta.hidden"
          :index="item.path"
          :key="item.path"
        >
          <template #title>
            <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <template v-if="item.children && item.children.length >= 2">
        <el-sub-menu
          :index="item.path"
          :key="item.path"
          v-if="item.meta && !item.meta.hidden"
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
  </div>
</template>

<script setup lang="ts" name="Menu">
// 这里可以写你的业务逻辑
import { useRouter } from 'vue-router'
const $router = useRouter()
const props = defineProps<{
  menuList: any[]
}>()
console.log(props.menuList)
defineOptions({
  name: 'Menu',
})
const goRouter = (e: any) => {
  $router.push(e.index)
}
</script>
<style scoped lang="scss"></style>
