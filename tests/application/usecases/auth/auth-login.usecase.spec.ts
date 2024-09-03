import { IBcryptHashComparer } from '@/application/protocols/cryptography/bcrypt/bcrypt-protocol'
import { IJwtEncrypter } from '@/application/protocols/cryptography/jwt/jwt-protocol'
import { IAuthLoginRepository } from '@/application/protocols/db/auth'
import { AuthLoginUseCase } from '@/application/usecases/auth'
import { IAuthLoginUseCase } from '@/domain/usecases/auth'

type SutTypes = {
  repository: IAuthLoginRepository
  hasher: IBcryptHashComparer
  encrypter: IJwtEncrypter
  sut: IAuthLoginUseCase
}

const makeSut = (): SutTypes => {
  class AuthLoginRepositoryStub implements IAuthLoginRepository {
    async findUserByEmail(): Promise<IAuthLoginRepository.User | null> {
      return Promise.resolve({
        id: '1',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    }
  }

  class BcryptHasherStub implements IBcryptHashComparer {
    async compare(): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  class JwtEncrypterStub implements IJwtEncrypter {
    async encrypt(): Promise<string> {
      return Promise.resolve('any_access_token')
    }
  }
  const repository = new AuthLoginRepositoryStub()
  const hasher = new BcryptHasherStub()
  const encrypter = new JwtEncrypterStub()
  const sut = new AuthLoginUseCase(repository, hasher, encrypter)
  return { repository, hasher, encrypter, sut }
}

const makeFakeInput = () => ({
  email: 'any_mail@mail.com',
  password: 'any_password'
})

describe('AuthLoginService', () => {
  it('should return error if email is not found', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null)
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error('E-mail not found'))
  })

  it('should return error if password is invalid', async () => {
    const { sut, hasher } = makeSut()
    jest.spyOn(hasher, 'compare').mockResolvedValueOnce(false)
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error('Invalid password'))
  })

  it('should throw if AuthLoginRepository.findUserByEmail throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findUserByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should throw if BcryptHashComparer.compare throws', async () => {
    const { sut, hasher } = makeSut()
    jest.spyOn(hasher, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should throw if JwtEncrypter.encrypt throws', async () => {
    const { sut, encrypter } = makeSut()
    jest.spyOn(encrypter, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should return success with access token if authentication is successful', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeInput())
    expect(result).toEqual({
      type: 'success',
      accessToken: 'any_access_token',
      message: 'User logged in successfully'
    })
  })
})
