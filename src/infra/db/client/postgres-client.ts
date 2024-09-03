import { Pool, PoolClient } from 'pg'

export interface IPostgresClient {
  connect(): Promise<PoolClient>
  disconnect(): Promise<void>
  getPool(): Pool
}

export class PostgresClient implements IPostgresClient {
  private pool: Pool

  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER ?? 'user',
      host: process.env.POSTGRES_HOST ?? 'db',
      database: process.env.POSTGRES_DATABASE ?? 'your-database',
      password: process.env.POSTGRES_PASSWORD ?? 'password',
      port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10)
    })
  }

  async connect(): Promise<PoolClient> {
    try {
      const client = await this.pool.connect()
      console.log('Connected to PostgreSQL')
      return client
    } catch (error) {
      console.error('Error connecting to PostgreSQL:', error)
      throw new Error('Failed to connect to PostgreSQL')
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.pool.end()
      console.log('Disconnected from PostgreSQL')
    } catch (error) {
      console.error('Error disconnecting from PostgreSQL:', error)
    }
  }

  getPool(): Pool {
    return this.pool
  }
}

export const postgres = new PostgresClient()
