import http from 'node:http'

import { getRequestBody } from './utils/getRequestBody.js'
import { routes } from './routes.js'


const server = http.createServer(async (req, res) => {
  const { method, url } = req
  
  try {
    req.body = await getRequestBody(req)
  } catch (error) {
    req.body = null
  }

  const route = routes.find(r => r.method === method && r.path === url)

  if (route) return route.handle(req, res)

  res.end("Desafio 1");
})

server.listen(3000)