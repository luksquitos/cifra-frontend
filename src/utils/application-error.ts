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

  constructor({ message, code, response }: AxiosError<ApiResponseError>) {
    this.errorMessage = message
    this.code = Number.isNaN(Number(code)) ? 500 : Number(code)
    if (response) {
      const returnedErrors = response.data.errors || []

      this.errors = response.data.errors

      const errorsMessage
        = returnedErrors.length > 0 ? `: ${returnedErrors.join('\n•')}` : ''

      this.responseMessage = `${response.data.message}${errorsMessage}`
    }
  }

  public get message(): string {
    return this.responseMessage || this.errorMessage
  }
}
