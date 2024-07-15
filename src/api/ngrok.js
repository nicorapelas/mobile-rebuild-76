import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
  baseURL: 'https://ac2d-41-216-201-212.ngrok-free.app',
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
