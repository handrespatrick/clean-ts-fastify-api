import { IAuthLoginUseCase } from '@/domain/usecases/auth'
import { AuthLoginController } from '@/presentation/controllers/auth'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

type SutTypes = {
  usecase: IAuthLoginUseCase
  sut: IController
}

const makeSut = (): SutTypes => {
  class AuthLoginUseCaseStub implements IAuthLoginUseCase {
    public async handle(): Promise<
      Partial<{
        accessToken: string
        email: string
        name: string
        type: 'error' | 'success'
        message: string
      }>
    > {
      return {
        type: 'success',
        accessToken: 'any_access_token'
      }
    }
  }
  const usecase = new AuthLoginUseCaseStub()
  const sut = new AuthLoginController(usecase)
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

describe('AuthLoginController', () => {
  it('should call authLoginUsecase with correct parameters', async () => {
    const { usecase, sut } = makeSut()
    const usecaseSpy = jest.spyOn(usecase, 'handle')
    await sut.handle(makeFakeRequest())
    expect(usecaseSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  it('should return 200 with auth result if login is successful', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(
      ok({
        type: 'success',
        accessToken: 'any_access_token'
      })
    )
  })

  it('should return 401 if login is unsuccessful', async () => {
    const { usecase, sut } = makeSut()
    jest.spyOn(usecase, 'handle').mockResolvedValueOnce({
      type: 'error',
      message: 'Unauthorized'
    })
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(
      unauthorized({
        type: 'error',
        message: 'Unauthorized'
      })
    )
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const { sut, usecase } = makeSut()
    jest.spyOn(usecase, 'handle').mockRejectedValueOnce(new Error('Internal server error'))
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(new Error('Internal server error')))
  })
})
