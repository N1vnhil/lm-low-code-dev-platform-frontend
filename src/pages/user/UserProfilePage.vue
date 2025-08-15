<template>
  <div id="userProfilePage">
    <!-- 头部背景装饰 -->
    <div class="page-header">
      <div class="header-decoration"></div>
      <div class="header-pattern"></div>
    </div>

    <!-- 个人资料卡片 -->
    <div class="profile-card">
      <div class="avatar-section">
        <div class="avatar-wrapper" @click="editAvatar" :title="'点击修改头像'">
          <div class="avatar-ring"></div>
          <img
            v-if="userInfo.userAvatar"
            :src="userInfo.userAvatar"
            alt="User Avatar"
            class="user-avatar"
          />
          <div v-else class="default-avatar">
            <span>{{ userInfo.userName?.charAt(0) || 'U' }}</span>
          </div>
          <!-- 头像编辑提示 -->
          <div class="avatar-edit-hint">
            <svg viewBox="0 0 24 24" fill="currentColor" class="edit-icon">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="m18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <div class="avatar-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" class="badge-icon">
              <path
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="profile-info">
        <div class="user-name-section">
          <h1 class="user-name">{{ userInfo.userName }}</h1>
        </div>

        <div class="user-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="currentColor" class="meta-icon">
              <path
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>{{ userInfo.userAccount }}</span>
          </div>

          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="currentColor" class="meta-icon">
              <path
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <span class="user-role-badge" :class="getRoleClass()">
              {{ userRoleText }}
            </span>
          </div>

          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="currentColor" class="meta-icon">
              <path
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v8a2 2 0 002 2h4a2 2 0 002-2v-8m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6"
              />
            </svg>
            <span>{{ joinDateText }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑表单 -->
    <div class="edit-section">
      <div class="section-header">
        <h2 class="section-title">
          <svg viewBox="0 0 24 24" fill="currentColor" class="section-icon">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="m18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          编辑个人资料
        </h2>
        <p class="section-subtitle">更新您的个人信息和偏好设置</p>
      </div>

      <div class="form-container">
        <a-form :model="formState" layout="vertical" @finish="handleSubmit" class="profile-form">
          <div class="form-grid">
            <a-form-item
              label="用户名"
              name="userName"
              :rules="[{ required: true, message: '请输入用户名' }]"
              class="form-item-enhanced"
            >
              <div class="input-wrapper">
                <svg viewBox="0 0 24 24" fill="currentColor" class="input-icon">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <a-input
                  v-model:value="formState.userName"
                  placeholder="请输入用户名"
                  class="styled-input"
                />
              </div>
            </a-form-item>
          </div>

          <a-form-item label="个人简介" name="userProfile" class="form-item-enhanced full-width">
            <div class="textarea-wrapper">
              <svg viewBox="0 0 24 24" fill="currentColor" class="textarea-icon">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
                <path d="M9 9h6M9 13h6m-6 4h4" />
              </svg>
              <a-textarea
                v-model:value="formState.userProfile"
                placeholder="介绍一下自己吧..."
                class="styled-textarea"
                :rows="4"
              />
            </div>
          </a-form-item>

          <div class="form-actions">
            <a-button class="cancel-btn"> 取消 </a-button>
            <a-button type="primary" html-type="submit" class="save-btn" :loading="saving">
              <svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              保存更改
            </a-button>
          </div>
        </a-form>
      </div>
    </div>

    <!-- 头像编辑弹窗 -->
    <a-modal
      v-model:visible="avatarModalVisible"
      title="修改头像"
      :footer="null"
      width="500px"
      class="avatar-modal"
    >
      <div class="avatar-edit-content">
        <div class="current-avatar">
          <h3>当前头像</h3>
          <div class="avatar-preview">
            <img
              v-if="userInfo.userAvatar"
              :src="userInfo.userAvatar"
              alt="Current Avatar"
              class="preview-img"
            />
            <div v-else class="preview-default">
              <span>{{ userInfo.userName?.charAt(0) || 'U' }}</span>
            </div>
          </div>
        </div>

        <div class="avatar-input-section">
          <a-form @finish="handleAvatarSubmit" layout="vertical">
            <a-form-item
              label="头像URL"
              name="userAvatar"
              :rules="[
                { required: true, message: '请输入头像URL' },
                { type: 'url', message: '请输入有效的URL地址' },
              ]"
            >
              <div class="input-wrapper">
                <svg viewBox="0 0 24 24" fill="currentColor" class="input-icon">
                  <path
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <a-input
                  v-model:value="avatarForm.userAvatar"
                  placeholder="请输入头像URL"
                  class="styled-input"
                />
              </div>
            </a-form-item>

            <!-- 新头像预览 -->
            <div v-if="avatarForm.userAvatar" class="new-avatar-preview">
              <h3>新头像预览</h3>
              <div class="avatar-preview">
                <img
                  :src="avatarForm.userAvatar"
                  alt="New Avatar"
                  class="preview-img"
                  @error="handleImageError"
                />
              </div>
            </div>

            <div class="modal-actions">
              <a-button @click="avatarModalVisible = false" class="cancel-btn"> 取消 </a-button>
              <a-button type="primary" html-type="submit" class="save-btn" :loading="savingAvatar">
                保存头像
              </a-button>
            </div>
          </a-form>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { updateUserInfo } from '@/api/userController'
import { useLoginUserStore } from '@/stores/loginUser'

// 获取当前登录用户信息
const loginUserStore = useLoginUserStore()
const userInfo = ref<API.UserVO>({})
const saving = ref(false)
const avatarModalVisible = ref(false)
const savingAvatar = ref(false)

// 表单状态
const formState = reactive<API.UserUpdateRequest>({
  userName: '',
  userProfile: '',
})

// 头像编辑表单
const avatarForm = reactive({
  userAvatar: '',
})

// 获取角色样式类
const getRoleClass = () => {
  return userInfo.value.userRole === 'admin' ? 'role-admin' : 'role-user'
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    if (loginUserStore.loginUser) {
      userInfo.value = loginUserStore.loginUser
    } else {
      await loginUserStore.fetchUser()
      userInfo.value = loginUserStore.loginUser
    }

    formState.userName = userInfo.value.userName || ''
    formState.userProfile = userInfo.value.userProfile || ''
    avatarForm.userAvatar = userInfo.value.userAvatar || ''
  } catch (error) {
    message.error('获取用户信息失败')
    console.error('Failed to fetch user info:', error)
  }
}

// 编辑头像
const editAvatar = () => {
  avatarForm.userAvatar = userInfo.value.userAvatar || ''
  avatarModalVisible.value = true
}

// 处理图片加载错误
const handleImageError = () => {
  message.error('图片加载失败，请检查URL是否正确')
}

// 提交头像更改
const handleAvatarSubmit = async () => {
  try {
    savingAvatar.value = true
    const res = await updateUserInfo({
      id: userInfo.value.id,
      userAvatar: avatarForm.userAvatar,
    })

    if (res.data.code === 0) {
      message.success('头像更新成功')
      await loginUserStore.fetchUser()
      userInfo.value = loginUserStore.loginUser
      avatarModalVisible.value = false
    } else {
      message.error('头像更新失败: ' + res.data.message)
    }
  } catch (error) {
    message.error('头像更新失败，请重试')
    console.error('Failed to update avatar:', error)
  } finally {
    savingAvatar.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    saving.value = true
    const res = await updateUserInfo({
      ...formState,
      id: userInfo.value.id,
    })

    if (res.data.code === 0) {
      message.success('保存成功')
      await loginUserStore.fetchUser()
      userInfo.value = loginUserStore.loginUser
    } else {
      message.error('保存失败: ' + res.data.message)
    }
  } catch (error) {
    message.error('保存失败，请重试')
    console.error('Failed to update user:', error)
  } finally {
    saving.value = false
  }
}

// 格式化用户角色文本
const userRoleText = ref('')
const joinDateText = ref('')

const updateDerivedData = () => {
  userRoleText.value = userInfo.value.userRole === 'admin' ? '管理员' : '普通用户'
  joinDateText.value = userInfo.value.createTime
    ? new Date(userInfo.value.createTime).toLocaleDateString('zh-CN')
    : '未知'
}

onMounted(() => {
  fetchUserInfo().then(() => {
    updateDerivedData()
  })
})
</script>

<style scoped>
#userProfilePage {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  position: relative;
}

.page-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  overflow: hidden;
  z-index: 0;
}

.header-decoration {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.header-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.profile-card {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  max-width: 900px;
  padding: 60px 32px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  margin-top: 80px;
  margin-bottom: 32px;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.avatar-section {
  flex-shrink: 0;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 3px solid;
  border-image: linear-gradient(45deg, #667eea, #764ba2) 1;
  border-radius: 50%;
  animation: rotate 3s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.user-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  pointer-events: none;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.default-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: 700;
  border: 4px solid white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  pointer-events: none;
}

.default-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.avatar-edit-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
  pointer-events: none;
}

.avatar-wrapper:hover .avatar-edit-hint {
  opacity: 1;
}

.edit-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.avatar-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;
}

.badge-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.user-name-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.user-name {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 16px;
}

.meta-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

.user-role-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-admin {
  background: #fef3c7;
  color: #d97706;
}

.role-user {
  background: #dbeafe;
  color: #2563eb;
}

.edit-section {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto 40px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-header {
  padding: 32px 40px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.section-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.section-subtitle {
  color: #64748b;
  margin: 0;
  font-size: 16px;
}

.form-container {
  padding: 40px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-item-enhanced {
  margin-bottom: 0;
}

.form-item-enhanced :deep(.ant-form-item-label) {
  margin-bottom: 8px;
}

.form-item-enhanced :deep(.ant-form-item-label > label) {
  font-weight: 600;
  color: #374151;
  font-size: 16px;
}

.input-wrapper,
.textarea-wrapper {
  position: relative;
}

.input-icon,
.textarea-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #9ca3af;
  z-index: 1;
}

.textarea-icon {
  top: 16px;
  transform: none;
}

.styled-input {
  padding-left: 40px;
  height: 36px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.styled-input:hover {
  border-color: #d1d5db;
}

.styled-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.styled-textarea {
  padding: 12px 12px 12px 40px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.2s ease;
  resize: vertical;
}

.styled-textarea:hover {
  border-color: #d1d5db;
}

.styled-textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.cancel-btn {
  padding: 0 24px;
  height: 44px;
  border-radius: 12px;
  font-weight: 600;
  border: 2px solid #e5e7eb;
  color: #6b7280;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  border-color: #d1d5db;
  color: #374151;
}

.save-btn {
  padding: 0 32px;
  height: 44px;
  border-radius: 12px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.save-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

/* 头像编辑弹窗样式 */
.avatar-modal :deep(.ant-modal-content) {
  border-radius: 16px;
  overflow: hidden;
}

.avatar-modal :deep(.ant-modal-header) {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 24px;
}

.avatar-modal :deep(.ant-modal-title) {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.avatar-edit-content {
  padding: 24px;
}

.current-avatar {
  margin-bottom: 24px;
  text-align: center;
}

.current-avatar h3 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.avatar-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.preview-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
}

.preview-default {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 700;
  border: 3px solid #e5e7eb;
}

.new-avatar-preview {
  margin-top: 20px;
  text-align: center;
}

.new-avatar-preview h3 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #userProfilePage {
    padding: 16px;
  }

  .profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 24px;
    gap: 24px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .form-container {
    padding: 24px;
  }

  .section-header {
    padding: 24px;
  }

  .avatar-edit-content {
    padding: 16px;
  }

  .avatar-modal :deep(.ant-modal-header) {
    padding: 16px 20px;
  }
}

/* Ant Design 组件样式覆盖 */
.profile-form :deep(.ant-form-item) {
  margin-bottom: 24px;
}

.profile-form :deep(.ant-input),
.profile-form :deep(.ant-input:focus),
.profile-form :deep(.ant-input-focused) {
  border: none;
  box-shadow: none;
  outline: none;
}

.profile-form :deep(.ant-btn-primary) {
  border: none;
  box-shadow: none;
}

.profile-form :deep(.ant-btn-primary):hover {
  border: none;
}
</style>
