/* eslint-disable new-cap */
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { Routes } from './routes'
import config from './config/config'

const app = express()
app.use(bodyParser.json())

Routes.forEach(route => {
  (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    const result = (new (route.controller)())[route.action](req, res, next)
    if (result instanceof Promise) {
      result.then(d => {
        if (d && d.status) { res.status(d.status).send(d.message || d.errors) } else if (d && d.file) { res.json(d) }
      })
    } else if (result !== null && result !== undefined) {
      res.json(result)
    }
  })
})

app.listen(config.port, () => {
  console.log(`Api inicializada na porta ${config.port}`)
})
