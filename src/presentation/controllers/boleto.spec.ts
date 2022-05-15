import { BoletoModel } from '../../domain/models/boleto'
import { GetBoleto } from '../../domain/usecases/get-boleto'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, ok } from '../helpers/http-helper'
import { HttpRequest } from '../protocols'
import { BoletoValidator } from '../protocols/boleto-validator'
import { BoletoController } from './boleto'

const makeBoletoValidator = (): BoletoValidator => {
  class BoletoValidatorStub implements BoletoValidator {
    isValid (barCode: string): boolean {
      return true
    }
  }
  return new BoletoValidatorStub()
}

const makeGetBoleto = (): GetBoleto => {
  class GetBoletoStub implements GetBoleto {
    get (barCode: string): BoletoModel {
      return makeFakeBoleto()
    }
  }
  return new GetBoletoStub()
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    barCode: '21299758700000020000001121100012100447561740'
  }
})

const makeFakeBoleto = (): BoletoModel => ({
  barCode: '21299758700000020000001121100012100447561740',
  amount: '20.00',
  expirationDate: '2018-07-16'
})

interface SutTypes {
  sut: BoletoController
  boletoValidatorStub: BoletoValidator
  getBoletoStub: GetBoleto
}

const makeSut = (): SutTypes => {
  const boletoValidatorStub = makeBoletoValidator()
  const getBoletoStub = makeGetBoleto()
  const sut = new BoletoController()
  return {
    sut,
    boletoValidatorStub,
    getBoletoStub
  }
}

describe('Boleto Controller', () => {
  test('Deve retorna 400 se não for passado o codigo de barra', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      params: {
        barCode: null
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('barCode')))
  })

  test('Deve retorna 400 se o codigo de barra for invalido', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      params: {
        barCode: 'A1b9~001192110001210904475617405975870000002000'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('barCode')))
  })

  test('Deve retorna 400 se BoletoValidador retonar false', () => {
    const { sut, boletoValidatorStub } = makeSut()
    jest.spyOn(boletoValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest: HttpRequest = {
      params: {
        barCode: '41299758700000020000001121100012100447561741'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('barCode')))
  })

  test('Deve retorna 200 se dados forem corretos', () => {
    const { sut } = makeSut()
    const httpResponse = sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeBoleto()))
  })
})
