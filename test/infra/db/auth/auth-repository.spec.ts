import { AuthRepository } from '@/infra/db/auth/auth-repository'
import { prismaClient } from '@/infra/db/prisma-client'

describe('AuthRepository', () => {
  let authRepository: AuthRepository

  beforeEach(() => {
    authRepository = new AuthRepository()
  })

  describe('findUserByEmail', () => {
    it('should return user data if user with given email exists', async () => {
      const email = 'test@example.com'
      const userData = {
        cliente_id: 1,
        email,
        username: 'testuser',
        senha: 'hashedPassword',
        nome: 'Test User',
        cpf: '12345678900',
        telefone: '1234567890',
        data_nascimento: null
      }

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValueOnce(userData)

      const result = await authRepository.findUserByEmail(email)

      expect(result).toEqual(userData)
      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { email }
      })
    })

    it('should return null if user with given email does not exist', async () => {
      const email = 'nonexistent@example.com'

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValueOnce(null)

      const result = await authRepository.findUserByEmail(email)

      expect(result).toBeNull()
      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { email }
      })
    })
  })

  describe('addUser', () => {
    it('should add a new user and return the created user data', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'password123'
      }
      const createdUser = {
        cliente_id: 2,
        email: userData.email,
        senha: userData.password,
        username: null,
        nome: null,
        cpf: '',
        telefone: null,
        data_nascimento: null
      }

      jest.spyOn(prismaClient.user, 'create').mockResolvedValueOnce(createdUser)

      const result = await authRepository.addUser(userData)

      expect(result).toEqual(createdUser)
      expect(prismaClient.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          username: null,
          senha: userData.password,
          nome: null,
          cpf: '',
          telefone: null,
          data_nascimento: null
        }
      })
    })
  })
})
