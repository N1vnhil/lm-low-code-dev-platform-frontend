<template>
  <div class="user-register-page">
    <h2>用户注册</h2>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="账号"
        name="userAccount"
        :rules="[{ required: true, message: '请输入账号!' }]"
      >
        <a-input v-model:value="formState.userAccount" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="[{ required: true, message: '请确认密码!' }]"
      >
        <a-input-password v-model:value="formState.checkPassword" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { userRegister } from '@/api/userController'
import { useRouter } from 'vue-router'

const router = useRouter()

interface FormState {
  userAccount: string
  userPassword: string
  checkPassword: string
}

const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  password: '',
  checkPassword: '',
})

const onFinish = async (values: FormState) => {
  if (values.userPassword !== values.checkPassword) {
    message.error('两次输入的密码不一致')
    return
  }

  const res = await userRegister(values)
  if (res.data.code === 0) {
    message.success('注册成功')
    router.push('/user/login')
  } else {
    message.error('注册失败，' + res.data.message)
  }
}
</script>

<style scoped>
.user-register-page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
