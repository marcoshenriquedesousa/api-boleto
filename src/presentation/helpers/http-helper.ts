import { HttpRespose } from '../protocols/http'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpRespose => ({
  status: 400,
  body: error
})

export const serverError = (error: Error): HttpRespose => ({
  status: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpRespose => ({
  status: 200,
  body: data
})
