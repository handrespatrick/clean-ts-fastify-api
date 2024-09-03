import { IAuthRegisterUseCase } from '@/domain/usecases/auth'
import { AuthRegisterController } from '@/presentation/controllers/auth'
import { ok, serverError, conflict } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

type SutTypes = {
  usecase: IAuthRegisterUseCase
  sut: IController
}

const makeSut = (): SutTypes => {
  class AuthRegisterUseCaseStub implements IAuthRegisterUseCase {
    public async handle(): Promise<string | null> {
      return 'User created successfully'
    }
  }
  const usecase = new AuthRegisterUseCaseStub()
  const sut = new AuthRegisterController(usecase)
  return { usecase, sut }
}

const makeFakeRequest = () => ({
  id: '1',
  params: {},
  raw: {},
  query: {},
  log: {},
  body: {
    email: 'test@example.com',
    password: 'password123'
  }
})

describe('AuthRegisterController', () => {
  it('should call authRegisterUsecase with correct parameters', async () => {
    const { usecase, sut } = makeSut()
    const handleSpy = jest.spyOn(usecase, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  it('should return 200 with auth result if registration is successful', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok('User created successfully'))
  })

  it('should return 409 if registration fails due to duplicate email', async () => {
    const { usecase, sut } = makeSut()
    const errorResult = 'E-mail already in use'
    jest.spyOn(usecase, 'handle').mockResolvedValueOnce(errorResult)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(conflict(errorResult))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const { usecase, sut } = makeSut()
    jest.spyOn(usecase, 'handle').mockRejectedValueOnce(new Error('Internal server error'))
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(new Error('Internal server error')))
  })
})
