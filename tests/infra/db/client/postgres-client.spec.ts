import { PostgresClient } from '@/infra/db/client/postgres-client'
import { Pool, PoolClient } from 'pg'

jest.mock('pg', () => {
  const mPoolClient = {
    connect: jest.fn(),
    release: jest.fn()
  }
  const mPool = {
    connect: jest.fn().mockResolvedValue(mPoolClient),
    end: jest.fn()
  }
  return { Pool: jest.fn(() => mPool) }
})

type SutTypes = {
  sut: PostgresClient
  pool: jest.Mocked<Pool>
  poolClient: jest.Mocked<PoolClient>
}

const makeSut = (): SutTypes => {
  const pool = new Pool() as jest.Mocked<Pool>
  const poolClient = {} as jest.Mocked<PoolClient>
  pool.connect.mockResolvedValue(poolClient as never)
  const sut = new PostgresClient()
  return { sut, pool, poolClient }
}

describe('PostgresClient', () => {
  describe('connect', () => {
    it('should connect to PostgreSQL', async () => {
      const { sut, pool } = makeSut()
      await sut.connect()
      expect(pool.connect).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if connection fails', async () => {
      const { sut, pool } = makeSut()
      pool.connect.mockRejectedValueOnce(new Error('Connection error') as never)
      const promise = sut.connect()
      expect(promise).rejects.toThrow('Failed to connect to PostgreSQL')
    })
  })

  describe('disconnect', () => {
    it('should disconnect from PostgreSQL', async () => {
      const { sut, pool } = makeSut()
      await sut.disconnect()
      expect(pool.end).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if disconnection fails', async () => {
      const { sut, pool } = makeSut()
      pool.end.mockRejectedValueOnce(new Error('Disconnection error') as never)
      sut.disconnect()
    })
  })

  describe('getPool', () => {
    it('should return the pool instance', () => {
      const { sut, pool } = makeSut()
      const result = sut.getPool()
      expect(result).toBe(pool)
    })
  })
})
