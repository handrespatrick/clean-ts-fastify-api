import { IDeleteUserUseCase } from '@/domain/usecases/user'
import { DeleteUserController } from '@/presentation/controllers/user'
import { serverError, ok } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

type SutTypes = {
  usecase: IDeleteUserUseCase
  sut: IController
}

const makeSut = (): SutTypes => {
  class DeleteUserUseCaseStub implements IDeleteUserUseCase {
    async handle(): Promise<void> {
      return Promise.resolve()
    }
  }
  const usecase = new DeleteUserUseCaseStub()
  const sut = new DeleteUserController(usecase)
  return { usecase, sut }
}

const makeFakeRequest = () => ({
  id: '1',
  params: { id: '1' },
  raw: {},
  query: {},
  log: {},
  body: {}
})

describe('DeleteuserController', () => {
  it('should return 200 with the deleted user data if deletion is successful', async () => {
    const { sut, usecase } = makeSut()
    jest.spyOn(usecase, 'handle').mockResolvedValueOnce()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok('User deleted successfully'))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const { sut, usecase } = makeSut()
    const error = new Error('Internal server error')
    jest.spyOn(usecase, 'handle').mockRejectedValueOnce(error)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(error))
  })
})
