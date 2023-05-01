import 'reflect-metadata'
import app from './server'
import { createServer, Server } from 'http'
import dataSource from './database/data-source'
import { loadArticles } from './database'

class SingleServer {
  constructor(app: any) {
    app.set('port', 3000)
    this.server = createServer(app)
    this.server.keepAliveTimeout = 0
    this.server.on('connection', (socket) => {
      socket.setTimeout(60000)
    })
  }
  server: Server
  startServer() {
    return new Promise((resolve, reject) => {
      try {
        this.server.listen(3000)
        resolve('服务端已经启动')
      } catch (error: any) {
        switch (error.code) {
          case 'ERR_SERVER_ALREADY_LISTEN':
            resolve('服务端已经启动')
            break
          case 'EACCES':
            reject('权限不足内置服务器启动失败，请使用管理员权限运行。')
            break
          case 'EADDRINUSE':
            reject('内置服务器端口已被占用，请检查。')
            break
          default:
            reject(error)
        }
      }
    })
  }
  stopServer() {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          switch ((err as any).code) {
            case 'ERR_SERVER_NOT_RUNNING':
              resolve('服务端未启动')
              break
            default:
              reject(err)
          }
        } else {
          resolve(1)
        }
      })
    })
  }
}

const singleServer = new SingleServer(app)

;(async () => {
  try {
    await dataSource.initialize()
    await loadArticles()
    const response = await singleServer.startServer()
    console.log(response)
  } catch (e) {
    console.log(e)
  }
})()
