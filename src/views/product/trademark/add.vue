<template>
  <el-dialog
    title="新增品牌"
    v-model="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="品牌名称" prop="tmName">
        <el-input
          placeholder="请您输入品牌名称"
          size="small"
          style="width: 200px"
          v-model="ruleForm.tmName"
        />
      </el-form-item>
      <el-form-item label="品牌Logo" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// 这里可以写你的业务逻辑
import { reactive, ref } from 'vue'

interface RuleForm {
  tmName: string
  logoUrl: string
}
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  tmName: '',
  logoUrl: '',
})
const rules = reactive<FormRules<RuleForm>>({
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
  logoUrl: [{ required: true, message: '请上传品牌Logo', trigger: 'blur' }],
})
const visible = ref(false)
const imageUrl = ref<string>()
const handleClose = () => {
  ruleFormRef.value?.resetFields()
  visible.value = false
}

const handleAvatarSuccess = () => {}
const beforeAvatarUpload = () => {}
defineExpose({
  visible,
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
