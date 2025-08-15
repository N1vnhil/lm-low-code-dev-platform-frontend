import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/userController.ts'

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: '未登录',
  })

  async function fetchUser() {
    const response = await getUserInfo()
    if (response.data.code === 0 && response.data.data) {
      loginUser.value = response.data.data
    }
  }

  function setLoginUser(user: API.LoginUserVO) {
    loginUser.value = user
  }

  return { loginUser, setLoginUser, fetchUser }
})
