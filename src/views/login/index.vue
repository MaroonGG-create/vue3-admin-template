<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTimer } from '@/utils/timer'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
const useStore = useUserStore()
const loginFormRef = ref<any>(null)
const loginForm = reactive({
  username: '',
  password: '',
})
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule：校验规则对象
  //value:表单元素文本内容
  //callback:符合条件，callback放行通过，不符合：注入错误提示信息
  if (value.length >= 5) {
    console.log(rule)
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  //rule：校验规则对象
  //value:表单元素文本内容
  //callback:符合条件，callback放行通过，不符合：注入错误提示信息
  if (value.length >= 6 && value.length <= 15) {
    console.log(rule)

    callback()
  } else {
    callback(new Error('密码长度应为6-15位'))
  }
}
const rules = reactive({
  // username: [
  //   { required: true, message: '请输入用户名', trigger: 'blur' },
  //   { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  // ],
  // password: [
  // {
  //     required: true,
  //     min: 6,
  //     max: 10,
  //     message: '长度应为6-15位',
  //     trigger: 'change',
  //   },
  // ],
  username: [{ trigger: 'change', validate: validatorUserName }],
  password: [{ trigger: 'change', validate: validatorPassword }],
})

const loading = ref<boolean>(false)
const handleLogin = async () => {
  await loginFormRef.value.validate()
  loading.value = true
  console.log()

  try {
    await useStore.userLogin(loginForm)
    console.log($route.query)
    const redirect = $route.query.redirect as string
    $router.push({ path: redirect || '/' })
    //登录成功的提示信息
    ElNotification({
      type: 'success',
      message: '登录成功！',
      title: `Hi ${getTimer()}`,
    })
    //登录成功,加载效果也消失
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
