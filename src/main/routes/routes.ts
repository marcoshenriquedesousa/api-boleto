import { BoletoController } from '../../presentation/controllers/boleto'

export const Routes = [
  { method: 'get', route: '/boleto/:barCode', controller: BoletoController, action: 'handle' }
]
