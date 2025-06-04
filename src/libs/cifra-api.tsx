import { AxiosError } from 'axios'

import { getTokens, storeAccessToken } from '@/storage/token-storage'
import { ApplicationError } from '@/utils/application-error'

import type { SignOut } from './rest-client'

import { Rest } from './rest-client'

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let failedQueued: Array<PromiseType> = []
let isRefreshing = false

export const cifraApi = new Rest({
  // eslint-disable-next-line node/no-process-env
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
})

cifraApi.axios.registerInterceptTokenManager = (singOut: SignOut) => {
  const interceptTokenManager = cifraApi.axios.interceptors.response.use(
    (response: any) => response,
    async (requestError: any) => {
      if (requestError.response?.status === 401) {
        if (
          requestError.response?.status === 401
        ) {
          const { refreshToken } = await getTokens()
          if (!refreshToken) {
            singOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueued.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(cifraApi.axios(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true

          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await cifraApi.post(
                '/api/auth/token/refresh/',
                {
                  refresh: refreshToken,
                },
              )

              await storeAccessToken(data.access)

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.access}`,
              }
              cifraApi.axios.defaults.headers.common.Authorization
                = `Bearer ${data.access}`

              failedQueued.forEach((request) => {
                request.onSuccess(data.access)
              })

              resolve(cifraApi.axios(originalRequestConfig))
            }
            catch (error: any) {
              failedQueued.forEach((request) => {
                request.onFailure(error)
              })
              singOut()
              reject(error)
            }
            finally {
              isRefreshing = false
              failedQueued = []
            }
          })
        }

        singOut()
      }

      if (requestError instanceof AxiosError && requestError.response && requestError.response.data) {
        throw new ApplicationError(requestError)
      }
      else {
        return Promise.reject(requestError)
      }
    },
  )

  return () => {
    cifraApi.axios.interceptors.response.eject(interceptTokenManager)
  }
}
