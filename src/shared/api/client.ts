import axios from 'axios'

/**
 * Axios instance for the Innopolis Transit API.
 * baseURL '/api' is proxied by Vite to http://localhost:8000
 * so all calls go to /api/v1/... → http://localhost:8000/api/v1/...
 */
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30_000,
})

export default apiClient
