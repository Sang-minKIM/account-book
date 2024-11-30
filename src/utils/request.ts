import axios, { AxiosRequestConfig } from 'axios'
import { RequestError } from './request-error'

const BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const request = async (path: string, config?: AxiosRequestConfig) => {
  try {
    const response = await axios({
      url: `${BASE_URL}${path}`,
      ...config,
      headers: {
        ...config?.headers,
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response
      throw new RequestError({
        errorCode: data.errorCode,
        message: data.message,
        endpoint: path,
      })
    } else {
      console.error(error)
      throw error
    }
  }
}
