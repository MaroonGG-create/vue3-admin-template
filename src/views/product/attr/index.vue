<template>
  <div>
    <el-card>
      <el-form :model="queryForm" label-width="auto" :inline="true">
        <el-form-item label="一级分类" prop="tmName">
          <el-select
            v-model="queryForm.category1Id"
            placeholder="请选择"
            clearable
            style="width: 200px"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="tmName">
          <el-select
            v-model="queryForm.category2Id"
            placeholder="请选择"
            clearable
            style="width: 200px"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类" prop="tmName">
          <el-select
            v-model="queryForm.category3Id"
            placeholder="请选择"
            clearable
            style="width: 200px"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-button type="primary" size="default" icon="Plus" @click="handleAdd">
        添加平台属性
      </el-button>
      <el-table :data="tableData" border style="margin: 10px 0px">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="属性名称" prop="tmName"></el-table-column>
        <el-table-column label="属性值名称" prop="tmName"></el-table-column>
        <el-table-column label="操作">
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
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 这里可以写你的业务逻辑
import { reactive } from 'vue'
const queryForm = reactive({
  category1Id: '',
  category2Id: '',
  category3Id: '',
})

const tableData: any = []

const handleAdd = () => {}

const handleEdit = (row: any) => {
  console.log(row)
}

const handleDelete = (row: any) => {
  console.log(row)
}
</script>

<style scoped lang="scss"></style>
