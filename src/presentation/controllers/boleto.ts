import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpRespose } from '../protocols'
import { isDigit } from '../../utils/utils'
import { BoletoValidadorController } from '../../utils/boleto-validador'
import { GetBoletoController } from './get-boleto'

export class BoletoController implements Controller {
  handle (httpRequest: HttpRequest): HttpRespose {
    try {
      const barCode = httpRequest.params.barCode
      if (!barCode) {
        return badRequest(new MissingParamError('barCode'))
      }
      if (!isDigit(barCode)) {
        return badRequest(new InvalidParamError('barCode'))
      }
      const isValid = new BoletoValidadorController().isValid(barCode)
      if (!isValid) {
        return badRequest(new InvalidParamError('barCode'))
      }
      const boleto = new GetBoletoController().get(barCode)
      return ok(boleto)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
