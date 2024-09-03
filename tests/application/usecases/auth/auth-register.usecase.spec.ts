import { IBcryptHasher } from '@/application/protocols/cryptography/bcrypt/bcrypt-protocol'
import { IAuthRegisterRepository } from '@/application/protocols/db/auth'
import { AuthRegisterUseCase } from '@/application/usecases/auth'
import { IAuthRegisterUseCase } from '@/domain/usecases/auth'

type SutTypes = {
  repository: IAuthRegisterRepository
  hasher: IBcryptHasher
  sut: IAuthRegisterUseCase
}

const makeSut = (): SutTypes => {
  class AuthRegisterRepositoryStub implements IAuthRegisterRepository {
    async findUserByEmail(): Promise<IAuthRegisterRepository.User | null> {
      return Promise.resolve(null)
    }

    async addUser(): Promise<IAuthRegisterRepository.User | null> {
      return Promise.resolve({
        id: '1',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
    }
  }

  class BcryptHasherStub implements IBcryptHasher {
    async hash(): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  const repository = new AuthRegisterRepositoryStub()
  const hasher = new BcryptHasherStub()
  const sut = new AuthRegisterUseCase(repository, hasher)
  return { repository, hasher, sut }
}

const makeFakeInput = () => ({
  email: 'any_mail@mail.com',
  password: 'any_password'
})

describe('AuthRegisterService', () => {
  it('should return "E-mail already in use" if email is already registered', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce({
      id: '1',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    const result = await sut.handle(makeFakeInput())
    expect(result).toEqual('E-mail already in use')
  })

  it('should return "User created successfully" if registration is successful', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeInput())
    expect(result).toBe('User created successfully')
  })

  it('should return "User creation failed" if registration fails', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'addUser').mockResolvedValueOnce(null)
    const result = await sut.handle(makeFakeInput())
    expect(result).toBe('User creation failed')
  })

  it('should throw if AuthRegisterRepository.findUserByEmail throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findUserByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should throw if BcryptHasher.hash throws', async () => {
    const { sut, hasher } = makeSut()
    jest.spyOn(hasher, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should throw if AuthRegisterRepository.addUser throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'addUser').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })
})
