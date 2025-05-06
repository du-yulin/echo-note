import axios, { HttpStatusCode } from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { useEventBus } from '@/composables/eventBus'
const eventBus = useEventBus()
const DEFAULT_PATH_PARAMS_REGEX = /\:(\w+)(?=\/|$)/
const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case HttpStatusCode.Unauthorized:
          eventBus.emit('API:401', error)
          break
        case HttpStatusCode.Forbidden:
          eventBus.emit('API:403', error)
          break
        case HttpStatusCode.NotFound:
          eventBus.emit('API:404', error)
          break
        case HttpStatusCode.InternalServerError:
          eventBus.emit('API:500', error)
          break
      }
    } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
        eventBus.emit('API:ECONNABORTED', error)
      } else if (error.code === 'ERR_NETWORK') {
        eventBus.emit('API:ERR_NETWORK', error)
      }
    } else {
      eventBus.emit('API:UNKNOWN', error)
    }
    return Promise.reject(error)
  },
)

type PathParams = {
  [key: string]: string | number
}
export type RequestConfig<D> = Omit<AxiosRequestConfig<D>, 'url' | 'method'> & {
  pathParams?: PathParams
  pathParamsRegex?: RegExp
}
export const request = <T = unknown, D = unknown>(
  url: string,
  method: Method = 'get',
  config?: RequestConfig<D>,
) => {
  const pathParams = config?.pathParams
  const pathParamsRegex = config?.pathParamsRegex || DEFAULT_PATH_PARAMS_REGEX
  if (pathParams) {
    url = url.replace(pathParamsRegex, (_, key) => `${pathParams[key]}` || '')
  }
  const axiosConfig = { ...config, url, method }
  return axiosInstance.request<T, AxiosResponse<T, D>, D>(axiosConfig)
}
