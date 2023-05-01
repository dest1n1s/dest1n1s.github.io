import { DataSource } from 'typeorm'
import { Blog } from './entities'

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'yang304291',
  database: 'dest1n1s',
  synchronize: true,
  logging: true,
  entities: [Blog],
  migrations: [],
  subscribers: []
})
