import { UserRepository } from '@/infra/db/user/user-repository'
import { Pool } from 'pg'

type SutTypes = {
  postgresClient: Pool
  sut: UserRepository
}

const makeSut = (): SutTypes => {
  const postgresClient = {
    query: jest.fn()
  } as unknown as Pool
  const sut = new UserRepository(postgresClient)
  return { postgresClient, sut }
}

const makeFakeUser = () => ({
  id: '1',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password'
})

describe('UserRepository', () => {
  describe('create', () => {
    it('should create a new user', async () => {
      const { postgresClient, sut } = makeSut()
      const querySpy = jest.spyOn(postgresClient, 'query')
      await sut.create(makeFakeUser())
      expect(querySpy).toHaveBeenCalledWith('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [
        makeFakeUser().id,
        makeFakeUser().name,
        makeFakeUser().email,
        makeFakeUser().password
      ])
    })
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const { postgresClient, sut } = makeSut()
      jest.spyOn(postgresClient, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: '1',
            name: 'any_name',
            email: 'any_mail@mail.com',
            password: 'any_password'
          }
        ]
      } as never)
      const result = await sut.findAll()
      expect(result).toEqual([
        {
          id: '1',
          name: 'any_name',
          email: 'any_mail@mail.com',
          password: 'any_password'
        }
      ])
    })
  })

  describe('findById', () => {
    it('should return user data for the given id', async () => {
      const { postgresClient, sut } = makeSut()
      jest.spyOn(postgresClient, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: '1',
            name: 'any_name',
            email: 'any_mail@mail.com',
            password: 'any_password'
          }
        ]
      } as never)
      const result = await sut.findById('1')
      expect(result).toEqual({
        id: '1',
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
    })

    it('should return null if id was not found', async () => {
      const { postgresClient, sut } = makeSut()
      jest.spyOn(postgresClient, 'query').mockResolvedValueOnce({
        rows: []
      } as never)
      const result = await sut.findById('1')
      expect(result).toBeNull()
    })
  })

  describe('update', () => {
    it('should update user', async () => {
      const { postgresClient, sut } = makeSut()
      const querySpy = jest.spyOn(postgresClient, 'query')
      await sut.update(makeFakeUser())
      expect(querySpy).toHaveBeenCalledWith('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [
        makeFakeUser().name,
        makeFakeUser().email,
        makeFakeUser().password,
        makeFakeUser().id
      ])
    })
  })

  describe('delete', () => {
    it('should delete user with the given id', async () => {
      const { postgresClient, sut } = makeSut()
      const querySpy = jest.spyOn(postgresClient, 'query')
      await sut.delete('1')
      expect(querySpy).toHaveBeenCalledWith('DELETE FROM users WHERE id = $1', [makeFakeUser().id])
    })
  })
})
