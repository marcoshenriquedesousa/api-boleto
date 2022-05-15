import { HttpRespose, HttpRequest } from './http'
export interface Controller {
  handle (httpRequest: HttpRequest): HttpRespose
}
