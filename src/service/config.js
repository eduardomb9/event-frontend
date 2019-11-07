import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8080/'
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    window.location = '#/home'
  }

  return Promise.reject(error)
})

export default http
