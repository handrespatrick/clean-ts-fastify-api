import { AuthRepository } from '@/infra/db/auth/auth-repository'
import { Pool } from 'pg'

type SutTypes = {
  postgresClient: Pool
  sut: AuthRepository
}

const makeSut = (): SutTypes => {
  const postgresClient = {
    query: jest.fn()
  } as unknown as Pool
  const sut = new AuthRepository(postgresClient)
  return { postgresClient, sut }
}

const makeFakeUser = () => ({
  id: '1',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password'
})

describe('AuthRepository', () => {
  describe('findUserByEmail', () => {
    it('should return user data if user with given email exists', async () => {
      const { postgresClient, sut } = makeSut()
      jest.spyOn(postgresClient, 'query').mockResolvedValueOnce({
        rows: [makeFakeUser()]
      } as never)
      const result = await sut.findUserByEmail('any_mail@mail.com')
      expect(result).toEqual(makeFakeUser())
    })

    it('should return null if user with given email does not exist', async () => {
      const { postgresClient, sut } = makeSut()
      jest.spyOn(postgresClient, 'query').mockResolvedValueOnce({
        rows: []
      } as never)
      const result = await sut.findUserByEmail('any_mail@mail.com')
      expect(result).toBeNull()
    })
  })

  describe('addUser', () => {
    it('should add a new user and return the created user data', async () => {
      const { sut, postgresClient } = makeSut()
      jest.spyOn(postgresClient, 'query').mockResolvedValueOnce({
        rows: [makeFakeUser()]
      } as never)
      const result = await sut.addUser(makeFakeUser())
      expect(result).toEqual(makeFakeUser())
    })
  })
})
