<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
// 这里可以写你的业务逻辑
import { ref } from 'vue'

const visible = ref(false)
const handleClose = () => {}
</script>

<style scoped lang="scss"></style>
