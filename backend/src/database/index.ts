import path from 'path'
import fs from 'fs'
import dataSource from './data-source'
import { Blog } from './entities'

export const loadArticles = async () => {
  return new Promise<void>((resolve, reject) => {
    const articlePath = path.join(__dirname, '../static/articles')
    fs.readdir(articlePath, async (err, files) => {
      if (err) {
        reject('Unable to scan directory: ' + err)
      }
      for (const file of files) {
        const data = fs.readFileSync(path.join(articlePath, file), 'utf8')
        const blog = new Blog(file.split('.')[0], data)
        await dataSource.getRepository(Blog).save(blog)
        fs.unlinkSync(path.join(articlePath, file))
      }
      resolve()
    })
  })
}
