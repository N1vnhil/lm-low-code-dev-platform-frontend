import { useLoginUserStore } from './stores/loginUser'
import { message } from 'ant-design-vue'
import router from './router'

let firstFetchLoginUser = true

router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore()
  if (firstFetchLoginUser) {
    await loginUserStore.fetchUser()
    firstFetchLoginUser = false
  }
  const loginUser = loginUserStore.loginUser
  const toUrl = to.fullPath
  if (toUrl.startsWith('/admin') && (!loginUser || loginUser.userRole !== 'admin')) {
    message.error('无权限访问，请先登录管理员账号')
    next('/user/login?redirect=' + encodeURIComponent(to.fullPath))
    return
  }
  next()
})
