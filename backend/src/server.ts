import express from 'express'
import bodyParser from 'body-parser'
import * as path from 'path'
import * as fs from 'fs'
import dataSource from './database/data-source'
import { Blog } from './database/entities'

const app = express()

console.log('Server started.')

app.use(bodyParser.json())

app.get('/articles', async (req, res) => {
  const articles = await dataSource.getRepository(Blog).find()
  res.send(articles)
})

app.get('/articles/:id', (req, res) => {
  res.send('Hello World!')
})

export default app
