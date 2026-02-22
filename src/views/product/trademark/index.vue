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
          <template #default="{ row }">
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="handleEdit(row)"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
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
    <addModal ref="addModalRef" @success="getHasTrademarkData" />
  </div>
</template>

<script setup lang="ts">
// 这里可以写你的业务逻辑
import { ref, onMounted, watch } from 'vue'
import {
  getTrademarkList,
  removeTrademark,
} from '@/api/product/trademark/index'
import addModal from './add.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { ResponseData } from '@/api/product/trademark/type'
let tableData = ref()
const pageNo = ref(1)
const limit = ref(3)
const total = ref<number>()
const addModalRef = ref()

const handleAdd = () => {
  addModalRef.value.open()
}

const handleEdit = (row: any) => {
  addModalRef.value.open(row)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    let res: ResponseData = await removeTrademark(row.id)
    if (res.code == 200) {
      ElMessage({
        type: 'success',
        message: '操作成功',
      })
      getHasTrademarkData()
    } else {
      ElMessage({
        type: 'error',
        message: res.message,
      })
    }
  })
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
