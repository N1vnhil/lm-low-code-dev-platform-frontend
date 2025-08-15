<script setup lang="ts">
import { message, type MenuProps } from 'ant-design-vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/loginUser.ts'
import { logout } from '@/api/userController'

const loginUserStore = useLoginUserStore()
const router = useRouter()
const selectedKeys = ref<string[]>(['/'])
router.afterEach((to) => {
  selectedKeys.value = [to.path]
})

const handleClick: MenuProps['onClick'] = (e) => {
  const key = e.key as string
  selectedKeys.value = [key]
  if (key.startsWith('/')) {
    // Navigate to the path if it starts with '/'
    router.push(key)
  }
}

const originItems = [
  {
    key: '/',
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
  },
]

const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    const menuKey = menu?.key as string
    if (menuKey?.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      if (!loginUser || loginUser.userRole !== 'admin') {
        return false
      }
    }
    return true
  })
}

const menuItems = computed<MenuProps['items']>(() => {
  return filterMenus(originItems)
})

const doLogout = async () => {
  const res = await logout()
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/user/login') // Redirect to login page
  } else {
    message.error('退出登录失败:' + res.data.message)
  }
}
</script>

<template>
  <a-layout-header class="header">
    <div class="logo-container">
      <img src="@/assets/logo.svg" alt="Logo" class="logo" />
      <h1 class="title">LLM Dev Platform</h1>
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="horizontal"
      :items="menuItems"
      @click="handleClick"
    />
    <div class="user-container">
      <div v-if="loginUserStore.loginUser.id">
        <a-dropdown>
          <a-space>
            <a-avatar :src="loginUserStore.loginUser.userAvatar" />
            {{ loginUserStore.loginUser.userName ?? '用户名未设置' }}
          </a-space>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile" @click="router.push('/user/profile')"
                >用户详情</a-menu-item
              >
              <a-menu-item key="logout" @click="doLogout">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: #001529;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 24px;
}

.logo {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.title {
  margin: 0;
  color: white;
  font-size: 18px;
}

.user-container {
  margin-left: auto;
  color: white;
  :deep(.ant-avatar) {
    width: 40px;
    height: 40px;
  }
  :deep(.ant-space-item) {
    font-size: 16px;
  }
}

:deep(.ant-menu) {
  flex: 1;
  background: transparent;
}
</style>
