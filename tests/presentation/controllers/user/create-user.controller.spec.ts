import { ICreateUserUseCase } from '@/domain/usecases/user'
import { CreateUserController } from '@/presentation/controllers/user'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

type SutTypes = {
  usecase: ICreateUserUseCase
  sut: IController
}

const makeSut = (): SutTypes => {
  class CreateUserUseCaseStub implements ICreateUserUseCase {
    async handle(): Promise<void> {
      return Promise.resolve()
    }
  }
  const usecase = new CreateUserUseCaseStub()
  const sut = new CreateUserController(usecase)
  return { usecase, sut }
}

const makeFakeRequest = () => ({
  id: '1',
  params: {},
  raw: {},
  query: {},
  log: {},
  body: {
    id: '1',
    name: 'Test User',
    email: 'any_mail@mail.com',
    password: 'any_password'
  }
})

describe('CreateUserController', () => {
  it('should call createUserUseCase with correct parameters', async () => {
    const { sut, usecase } = makeSut()
    jest.spyOn(usecase, 'handle').mockResolvedValueOnce()
    await sut.handle(makeFakeRequest())
    expect(usecase.handle).toHaveBeenCalledWith({
      id: '1',
      name: 'Test User',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  it('should return 200 with created User data if creation is successful', async () => {
    const { sut, usecase } = makeSut()
    jest.spyOn(usecase, 'handle').mockResolvedValueOnce()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok('User created successfully'))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const { sut, usecase } = makeSut()
    jest.spyOn(usecase, 'handle').mockRejectedValueOnce(new Error('Internal server error'))
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(new Error('Internal server error')))
  })
})
