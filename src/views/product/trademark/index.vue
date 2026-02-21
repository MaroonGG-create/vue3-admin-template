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
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <img :src="row.logoUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default>
            <el-button type="warning" size="small" icon="Edit">修改</el-button>
            <el-button type="danger" size="small" icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="total"
      />
    </el-card>
    <addModal ref="addModalRef" />
  </div>
</template>

<script setup lang="ts">
// 这里可以写你的业务逻辑
import { ref, onMounted, watch } from 'vue'
import { getTrademarkList } from '@/api/product/trademark/index'
import addModal from './add.vue'
let tableData = ref()
const pageNo = ref(1)
const limit = ref(3)
const total = ref<number>()
const addModalRef = ref()

const handleAdd = () => {
  addModalRef.value.visible = true
}
const getHasTrademarkData = async () => {
  let res: any = await getTrademarkList(pageNo.value, limit.value)
  if (res.code == 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  }
}
watch([pageNo, limit], () => {
  getHasTrademarkData()
})
onMounted(async () => {
  getHasTrademarkData()
})
</script>

<style scoped lang="scss"></style>
