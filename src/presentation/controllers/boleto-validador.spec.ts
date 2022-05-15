import { BoletoValidadorController } from './boleto-validador'

interface SutTypes {
  sut: BoletoValidadorController
}

const makeSut = (): SutTypes => {
  const sut = new BoletoValidadorController()
  return {
    sut
  }
}

describe('Boleto Validador', () => {
  test('Deve retorna false se não conter os 44 digitos', () => {
    const { sut } = makeSut()
    const barCode = '2421299758700000020000001121100012100447561740'
    const isValid = sut.isValid(barCode)
    expect(isValid).toBe(false)
  })

  test('Deve retorna true se o digito verificador for válido', () => {
    const { sut } = makeSut()
    const barCode = '21299758700000020000001121100012100447561740'
    const isValid = sut.isValid(barCode)
    expect(isValid).toBe(true)
  })

  test('Deve retorna false se o digito verificador for invalido', () => {
    const { sut } = makeSut()
    const barCode = '21299758700000020000012121100012100447561740'
    const isValid = sut.isValid(barCode)
    expect(isValid).toBe(false)
  })
})
