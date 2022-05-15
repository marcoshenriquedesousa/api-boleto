import { BoletoValidator } from '../protocols/boleto-validator'
import { modulo11 } from '../../utils/utils'

export class BoletoValidadorController implements BoletoValidator {
  isValid (barCode: string): boolean {
    const barCodeLenth = 44
    if (barCode.length !== barCodeLenth) {
      return false
    } else {
      const digits = barCode.split('')
      const checksum = digits.splice(4, 1)
      const result = (modulo11(digits).toString() === checksum.toString())
      return result
    }
  }
}
