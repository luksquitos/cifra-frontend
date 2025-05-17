import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import axios from 'axios'

import type { paths } from '@/@types/openapi'

type AxiosRequestConfigWithRouteParams<D> = AxiosRequestConfig<D> & {
  routeParams?: Record<string, string>
}

export type ApiResponseError = {
  statusCode: number
  message: string
  errors: string[]
}

export type SignOut = () => void

type ApiProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

export class Rest {
  #instance: ApiProps

  constructor(config?: AxiosRequestConfig) {
    this.#instance = axios.create({
      ...config,
    }) as ApiProps
  }

  private applyRouteParams(url: string, routeParams?: Record<string, string>) {
    if (!routeParams) {
      return url
    }

    return Object.entries(routeParams).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      url,
    )
  }

  get<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.#instance.get(this.applyRouteParams(url, routeParams), {
      ...others,
    })
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    data?: D,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.#instance.post(this.applyRouteParams(url, routeParams), data, {
      ...others,
    })
  }

  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    data?: D,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.#instance.postForm(
      this.applyRouteParams(url, routeParams),
      data,
      {
        ...others,
      },
    )
  }

  put<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    data?: D,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.#instance.put(this.applyRouteParams(url, routeParams), data, {
      ...others,
    })
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    data?: D,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.#instance.patch(this.applyRouteParams(url, routeParams), data, {
      ...others,
    })
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.#instance.delete(this.applyRouteParams(url, routeParams), {
      ...others,
    })
  }

  get axios() {
    return this.#instance
  }
}
