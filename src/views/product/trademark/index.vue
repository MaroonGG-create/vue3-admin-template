<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="handleAdd">
        添加品牌
      </el-button>
      <el-table :data="tableData" border style="margin: 10px 0px">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="品牌名称"></el-table-column>
        <el-table-column label="品牌LOGO"></el-table-column>
        <el-table-column label="品牌操作"></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="400"
      />
    </el-card>
    <addModal ref="addModalRef" />
  </div>
</template>

<script setup lang="ts">
// 这里可以写你的业务逻辑
import { ref } from 'vue'
import addModal from './add.vue'
let tableData = ref()
const pageNo = ref(1)
const limit = ref(3)
const addModalRef = ref()
const handleAdd = () => {
  addModalRef.value.visible = true
}
</script>

<style scoped lang="scss"></style>
