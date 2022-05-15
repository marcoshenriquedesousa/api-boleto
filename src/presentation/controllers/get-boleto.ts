import moment = require('moment')
import { BoletoModel } from '../../domain/models/boleto'
import { GetBoleto } from '../../domain/usecases/get-boleto'

export class GetBoletoController implements GetBoleto {
  get (barCode: string): BoletoModel {
    return {
      barCode: barCode,
      amount: this.amount(barCode),
      expirationDate: this.expirationDate(barCode)
    }
  }

  amount (barCode: string): string {
    const amount = (Number(barCode.substr(9, 10)) / 100.0).toFixed(2)
    return amount
  }

  expirationDate (barCode: string): string {
    const refDate = new Date(876236400000) // 1997-10-07 12:00:00 GMT-0300
    const days = Number(barCode.substr(5, 4))
    const newDate = new Date(refDate.getTime() + (days * 86400000))
    const expirationDate = moment(newDate).format('YYYY-MM-DD')
    return expirationDate
  }
}
