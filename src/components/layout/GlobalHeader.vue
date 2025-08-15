<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/loginUser.ts'

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

const menuItems = ref([
  {
    key: '1',
    label: 'Home',
    path: '/',
  },
  {
    key: '2',
    label: 'About',
    path: '/about',
  },
] as const)
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
        <a-space>
          <a-avatar :src="loginUserStore.loginUser.userAvatar" />
          {{ loginUserStore.loginUser.userName ?? '用户名未设置' }}
        </a-space>
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">Login</a-button>
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
}

:deep(.ant-menu) {
  flex: 1;
  background: transparent;
}
</style>
