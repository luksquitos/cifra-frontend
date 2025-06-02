import { AxiosError } from 'axios'

import type { Tokens } from '@/@types/tokens'

import { getTokens, storeTokens } from '@/storage/token-storage'
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
          requestError.response.data?.statusCode === '401'
          || requestError.response.data?.message === 'Unauthorized'
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
              const { data } = await cifraApi.post<Tokens>(
                '/api/auth/token/refresh/',
                {
                  refreshToken,
                },
              )

              await storeTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.accessToken}`,
              }
              cifraApi.axios.defaults.headers.common.Authorization
                = `Bearer ${data.accessToken}`

              failedQueued.forEach((request) => {
                request.onSuccess(data.accessToken)
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
