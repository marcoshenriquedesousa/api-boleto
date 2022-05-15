export class MissingParamError extends Error {
  constructor (paramName: string) {
    super('MissingParamError')
    this.name = 'Código de barra ausente'
  }
}
