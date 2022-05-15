import { BoletoModel } from '../../domain/models/boleto'
import { GetBoletoController } from './get-boleto'

const makeFakeBoleto = (): BoletoModel => ({
  barCode: '21299758700000020000001121100012100447561740',
  amount: '20.00',
  expirationDate: '2018-07-16'
})

interface SutTypes {
  sut: GetBoletoController
}

const makeSut = (): SutTypes => {
  const sut = new GetBoletoController()
  return {
    sut
  }
}

test('Deve retorna dados do boleto', () => {
  const { sut } = makeSut()
  const barCode = '21299758700000020000001121100012100447561740'
  const result = sut.get(barCode)

  expect(result).toEqual(makeFakeBoleto())
})
