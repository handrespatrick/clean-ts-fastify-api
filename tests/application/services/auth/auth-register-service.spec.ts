import { IBcryptHasher } from '@/application/protocols/cryptography/bcrypt/bcrypt-protocol'
import { IAuthRegisterRepository } from '@/application/protocols/db/auth'
import { AuthRegisterService } from '@/application/services/auth'

describe('AuthRegisterService', () => {
  let service: AuthRegisterService
  let authRegisterRepositoryMock: IAuthRegisterRepository
  let bcryptHasherMock: IBcryptHasher

  beforeEach(() => {
    authRegisterRepositoryMock = {
      findUserByEmail: jest.fn(),
      addUser: jest.fn()
    }

    bcryptHasherMock = {
      hash: jest.fn()
    }

    service = new AuthRegisterService(authRegisterRepositoryMock, bcryptHasherMock)
  })

  describe('authRegister', () => {
    const inputData = {
      email: 'new@example.com',
      password: 'password'
    }

    it('should return "E-mail already in use" if email is already registered', async () => {
      jest.spyOn(authRegisterRepositoryMock, 'findUserByEmail').mockResolvedValueOnce({
        cliente_id: 123,
        email: 'any_mail@mail.com',
        username: 'any_username',
        senha: 'any_password',
        nome: 'any_name',
        cpf: 'any_cpf',
        telefone: 'any_phone',
        data_nascimento: null
      })

      const result = await service.authRegister(inputData)

      expect(result).toBe('E-mail already in use')
    })

    it('should return "User created successfully" if registration is successful', async () => {
      jest.spyOn(authRegisterRepositoryMock, 'findUserByEmail').mockResolvedValueOnce(null)
      jest.spyOn(bcryptHasherMock, 'hash').mockResolvedValueOnce('hashedPassword')
      jest.spyOn(authRegisterRepositoryMock, 'addUser').mockResolvedValueOnce({
        cliente_id: 123,
        email: 'any_mail@mail.com',
        username: 'any_username',
        senha: 'any_password',
        nome: 'any_name',
        cpf: 'any_cpf',
        telefone: 'any_phone',
        data_nascimento: null
      })

      const result = await service.authRegister(inputData)

      expect(result).toBe('User created successfully')
    })

    it('should return "User creation failed" if registration fails', async () => {
      jest.spyOn(authRegisterRepositoryMock, 'findUserByEmail').mockResolvedValueOnce(null)
      jest.spyOn(bcryptHasherMock, 'hash').mockResolvedValueOnce('hashedPassword')
      jest.spyOn(authRegisterRepositoryMock, 'addUser').mockResolvedValueOnce(null)

      const result = await service.authRegister(inputData)

      expect(result).toBe('User creation failed')
    })

    it('should throw if AuthRegisterRepository.findUserByEmail throws', async () => {
      jest.spyOn(authRegisterRepositoryMock, 'findUserByEmail').mockRejectedValueOnce(new Error())

      const promise = service.authRegister(inputData)

      expect(promise).rejects.toThrow(new Error())
    })

    it('should throw if BcryptHasher.hash throws', async () => {
      jest.spyOn(authRegisterRepositoryMock, 'findUserByEmail').mockResolvedValueOnce(null)
      jest.spyOn(bcryptHasherMock, 'hash').mockRejectedValueOnce(new Error())

      const promise = service.authRegister(inputData)

      expect(promise).rejects.toThrow(new Error())
    })

    it('should throw if AuthRegisterRepository.addUser throws', async () => {
      jest.spyOn(authRegisterRepositoryMock, 'findUserByEmail').mockResolvedValueOnce(null)
      jest.spyOn(bcryptHasherMock, 'hash').mockResolvedValueOnce('hashedPassword')
      jest.spyOn(authRegisterRepositoryMock, 'addUser').mockRejectedValueOnce(new Error())

      const promise = service.authRegister(inputData)

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
