import { IBcryptHashComparer } from '@/application/protocols/cryptography/bcrypt/bcrypt-protocol'
import { IJwtEncrypter } from '@/application/protocols/cryptography/jwt/jwt-protocol'
import { IAuthLoginRepository } from '@/application/protocols/db/auth'
import { AuthLoginService } from '@/application/services/auth'

describe('AuthLoginService', () => {
  let service: AuthLoginService
  let authLoginRepositoryMock: IAuthLoginRepository
  let hashComparerMock: IBcryptHashComparer
  let jwtEncrypterMock: IJwtEncrypter

  beforeEach(() => {
    authLoginRepositoryMock = {
      findUserByEmail: jest.fn()
    }

    hashComparerMock = {
      compare: jest.fn()
    }

    jwtEncrypterMock = {
      encrypt: jest.fn()
    }

    service = new AuthLoginService(authLoginRepositoryMock, hashComparerMock, jwtEncrypterMock)
  })

  describe('authLogin', () => {
    const inputData = {
      email: 'existing@example.com',
      password: 'correctPassword'
    }

    const userAccount = {
      cliente_id: 123,
      email: 'any_mail@mail.com',
      username: 'any_username',
      senha: 'any_password',
      nome: 'any_name',
      cpf: 'any_cpf',
      telefone: 'any_phone',
      data_nascimento: null
    }

    it('should return error if email is not found', async () => {
      jest.spyOn(authLoginRepositoryMock, 'findUserByEmail').mockResolvedValue(null)

      const result = await service.authLogin(inputData)

      expect(result).toEqual({
        type: 'error',
        message: 'E-mail not found'
      })
    })

    it('should return error if password is invalid', async () => {
      const userAccount = {
        cliente_id: 123,
        email: 'any_mail@mail.com',
        username: 'any_username',
        senha: 'any_password',
        nome: 'any_name',
        cpf: 'any_cpf',
        telefone: 'any_phone',
        data_nascimento: null
      }

      jest.spyOn(authLoginRepositoryMock, 'findUserByEmail').mockResolvedValueOnce(userAccount)
      jest.spyOn(hashComparerMock, 'compare').mockResolvedValueOnce(false)

      const result = await service.authLogin(inputData)

      expect(result).toEqual({
        type: 'error',
        message: 'Invalid password'
      })
    })

    it('should return success with access token if authentication is successful', async () => {
      jest.spyOn(authLoginRepositoryMock, 'findUserByEmail').mockResolvedValueOnce(userAccount)
      jest.spyOn(hashComparerMock, 'compare').mockResolvedValueOnce(true)
      jest.spyOn(jwtEncrypterMock, 'encrypt').mockResolvedValueOnce('accessToken')

      const result = await service.authLogin(inputData)

      expect(result).toEqual({
        type: 'success',
        accessToken: 'accessToken',
        message: 'User logged in successfully'
      })
    })

    it('should throw if AuthLoginRepository.findUserByEmail throws', async () => {
      jest.spyOn(authLoginRepositoryMock, 'findUserByEmail').mockRejectedValueOnce(new Error())

      const promise = service.authLogin(inputData)

      expect(promise).rejects.toThrow(new Error())
    })

    it('should throw if BcryptHashComparer.compare throws', async () => {
      jest.spyOn(authLoginRepositoryMock, 'findUserByEmail').mockResolvedValueOnce(userAccount)
      jest.spyOn(hashComparerMock, 'compare').mockRejectedValueOnce(new Error())

      const promise = service.authLogin(inputData)

      expect(promise).rejects.toThrow(new Error())
    })

    it('should throw if JwtEncrypter.encrypt throws', async () => {
      jest.spyOn(authLoginRepositoryMock, 'findUserByEmail').mockResolvedValueOnce(userAccount)
      jest.spyOn(hashComparerMock, 'compare').mockResolvedValueOnce(true)
      jest.spyOn(jwtEncrypterMock, 'encrypt').mockRejectedValueOnce(new Error())

      const promise = service.authLogin(inputData)

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
