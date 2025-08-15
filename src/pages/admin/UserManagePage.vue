<template>
  <div id="userManagePage">
    <a-form layout="inline">
      <a-form-item label="账号">
        <a-input v-model:value="pageParams.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="pageParams.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="fetchData">搜索</a-button>
        <a-button
          style="margin-left: 8px"
          @click="
            () => {
              pageParams.userAccount = undefined
              pageParams.userName = undefined
              fetchData()
            }
          "
          >重置</a-button
        >
      </a-form-item>
    </a-form>
  </div>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination()"
    @change="doTableChange"
  >
    <template #bodyCell="{ column, record }">
      <span v-if="column.dataIndex === 'createTime'">
        {{ record.createTime ? new Date(record.createTime).toLocaleString() : '-' }}
      </span>
      <span v-else-if="column.dataIndex === 'userAvatar'">
        <img
          v-if="record.userAvatar"
          :src="record.userAvatar"
          alt="User Avatar"
          class="user-avatar"
          :width="120"
        />
        <span v-else>无头像</span>
      </span>
      <span v-else-if="column.dataIndex === 'userRole'">
        <span v-if="record.userRole === 'admin'">管理员</span>
        <span v-else-if="record.userRole === 'user'">普通用户</span>
        <span v-else>NULL</span>
      </span>
      <span v-else-if="column.key === 'action'">
        <a-button danger @click="doDelete(record.id)">删除</a-button></span
      >
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { page, remove } from '@/api/userController'
import { message } from 'ant-design-vue'
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'userAccount',
    dataIndex: 'userAccount',
  },
  {
    title: 'userName',
    dataIndex: 'userName',
  },
  {
    title: 'userAvatar',
    dataIndex: 'userAvatar',
  },
  {
    title: 'userProfile',
    dataIndex: 'userProfile',
  },
  {
    title: 'userRole',
    dataIndex: 'userRole',
  },
  {
    title: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
]

const data = ref<API.UserVO[]>([])
const total = ref(0)

const pageParams = reactive<API.UserQueryRequest>({
  pageNum: 1,
  pageSize: 10,
})

const fetchData = async () => {
  const res = await page({ ...pageParams })
  if (res.data.data) {
    data.value = res.data.data.records ?? []
    total.value = res.data.data.totalRow ?? 0
  } else {
    message.error('获取用户数据失败:' + res.data.message)
  }
}

const pagination = () => {
  return {
    pageSize: pageParams.pageSize ?? 10,
    current: pageParams.pageNum ?? 1,
    showSizeChanger: true,
    total: total.value,
    showTotal: (total: number) => `总共 ${total} 条`,
  }
}

const doTableChange = (page: { current: number | undefined; pageSize: number | undefined }) => {
  pageParams.pageNum = page.current
  pageParams.pageSize = page.pageSize
  fetchData()
}

const doDelete = async (id: number) => {
  if (!id) {
    return
  }
  const res = await remove({ id }) // Pass an object with id property to match DeleteRequest type
  if (res.data.code === 0) {
    message.success(`用户 ${id} 删除成功`)
    fetchData() // Refresh the user list after deletion
  } else {
    message.error(`删除用户 ${id} 失败: ${res.data.message}`)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.user-avatar {
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#userManagePage {
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
}

.ant-form-item {
  margin-bottom: 16px;
}

.ant-table {
  background: #fff;
  border-radius: 4px;
}

.ant-btn-danger {
  margin: 0 4px;
}
</style>
