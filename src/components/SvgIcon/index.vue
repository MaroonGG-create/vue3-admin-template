<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>
<script setup lang="ts">
const {
  prefix = '#icon-',
  name,
  color = '#333',
  width = '16px',
  height = '16px',
} = defineProps<{
  prefix?: string
  name: string
  color?: string
  width?: string
  height?: string
}>()
</script>
