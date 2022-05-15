import { BoletoModel } from '../models/boleto'

export interface GetBoleto {
  get (barCode: string): BoletoModel
}
