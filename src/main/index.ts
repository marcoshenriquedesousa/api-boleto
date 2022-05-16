import * as express from 'express'
import { Routes } from './routes/routes'
import { Response, Request } from 'express'
import env from './config/env'

const app = express()

Routes.forEach(route => {
  (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    const result = (new (route.controller as any)())[route.action](req, res, next)
    if (result instanceof Promise) {
      result.then(d => {
        if (d && d.status) { res.status(d.status).send(d.message || d.errors) } else { res.json(d) }
      })
    } else if (result !== null && result !== undefined) {
      res.json(result)
    }
  })
})

app.listen(env.port, () => console.log(`Api inicializada em http://localhost:${env.port}`))
