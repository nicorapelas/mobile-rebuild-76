import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
  baseURL: 'https://06a6-197-184-178-136.ngrok-free.app',
  // baseURL: 'https://cv-cloud-api.herokuapp.com',
})

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
