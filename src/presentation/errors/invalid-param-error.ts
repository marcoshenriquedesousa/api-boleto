export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super('InvalidParamError')
    this.name = 'Código de barra invalido'
  }
}
