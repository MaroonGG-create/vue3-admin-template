<template>
  <el-dialog
    :title="title"
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
          list-type="picture-card"
          :show-file-list="true"
          action="/admin/product/fileUpload"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
        >
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleOk" :loading="saveLoading">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// 这里可以写你的业务逻辑
import { reactive, ref } from 'vue'
import type { Trademark, ResponseData } from '@/api/product/trademark/type'
import type { FormInstance, FormRules } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { saveTrademark, updateTrademark } from '@/api/product/trademark'
import type { UploadProps } from 'element-plus'

const open = (row?: any) => {
  visible.value = true
  if (row) {
    title.value = '修改品牌'
    // 拷贝数据回显
    Object.assign(ruleForm, row)
  } else {
    title.value = '新增品牌'
    Object.assign(ruleForm, { tmName: '', logoUrl: '', id: undefined })
  }
}
const userStore = useUserStore()
const title = ref('新增品牌')
const emit = defineEmits(['success'])
const headers = { Token: userStore.token }
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})
let saveLoading = ref(false)
const rules = reactive<FormRules<Trademark>>({
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
  logoUrl: [{ required: true, message: '请上传品牌Logo', trigger: 'blur' }],
})
const visible = ref(false)
const handleClose = () => {
  ruleFormRef.value?.resetFields()
  visible.value = false
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  ruleForm.logoUrl = response.data
  ruleFormRef.value?.clearValidate('logoUrl')
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const FileTypeList = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  if (FileTypeList.includes(rawFile.type)) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handleOk = async () => {
  await ruleFormRef.value?.validate()
  saveLoading.value = true
  let res: ResponseData
  if (ruleForm.id) {
    res = await updateTrademark({
      id: ruleForm.id,
      tmName: ruleForm.tmName,
      logoUrl: ruleForm.logoUrl,
    })
  } else {
    res = await saveTrademark({
      tmName: ruleForm.tmName,
      logoUrl: ruleForm.logoUrl,
    })
  }
  saveLoading.value = false
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
    handleClose()
    emit('success')
  } else {
    ElMessage({
      type: 'error',
      message: res.message,
    })
  }
}

defineExpose({
  open,
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
