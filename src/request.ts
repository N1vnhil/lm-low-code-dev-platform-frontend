import axios from 'axios'
import { message } from 'ant-design-vue'

const myaxiost = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  withCredentials: true,
})

myaxiost.interceptors.request.use(
  (config) => {
    // 可以在这里添加请求头或其他配置
    return config
  },
  (error) => {
    message.error('请求错误: ' + error.message)
    return Promise.reject(error)
  },
)

myaxiost.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code === 40100) {
      if (
        !response.request.responseURL.includes('/user/get/login') &&
        !window.location.href.includes('/user/login')
      ) {
        message.error('请先登录')
        window.location.href = '/user/login?redirect=${window.location.href}'
      }
    }
    return response
  },
  (error) => {
    message.error(error.message || '网络错误')
    return Promise.reject(error)
  },
)

export default myaxiost
