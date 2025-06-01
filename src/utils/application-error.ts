import type { AxiosError } from 'axios'

import type { ApiResponseError } from '@/libs/rest-client'

type ApplicationErrorProps = {
  errorMessage: string
  code: number
  responseMessage?: string
  errors?: string[]
}

export class ApplicationError implements ApplicationErrorProps {
  errorMessage: string
  code: number
  responseMessage?: string
  errors?: string[]

  constructor(error: AxiosError<ApiResponseError>) {
    this.errorMessage = error.message
    this.code = Number.isNaN(Number(error.code)) ? 500 : Number(error.code)
    if (error.response) {
      const returnedErrors = error.response.data.errors || []

      this.errors = error.response.data.errors

      const errorsMessage
        = returnedErrors.length > 0 ? `: ${returnedErrors.join('\n•')}` : ''

      this.responseMessage = `${error.response.data.message}${errorsMessage}`
    }
  }

  public get message(): string {
    return this.responseMessage || this.errorMessage
  }
}
