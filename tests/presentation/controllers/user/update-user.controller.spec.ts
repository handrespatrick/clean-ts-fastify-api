import { IUpdateUserUseCase } from '@/domain/usecases/user'
import { UpdateUserController } from '@/presentation/controllers/user'
import { serverError, ok } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

type SutTypes = {
  usecase: IUpdateUserUseCase
  sut: IController
}

const makeSut = (): SutTypes => {
  class UpdateUserUseCaseStub implements IUpdateUserUseCase {
    async handle(): Promise<void> {
      return Promise.resolve()
    }
  }
  const usecase = new UpdateUserUseCaseStub()
  const sut = new UpdateUserController(usecase)
  return { usecase, sut }
}

const makeFakeRequest = () => ({
  id: '1',
  params: { id: '1' },
  raw: {},
  query: {},
  log: {},
  body: {
    name: 'Updated User'
  }
})

describe('UpdateUserController', () => {
  it('should return 200 with the updated User data if update is successful', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok('User updated successfully'))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const { sut, usecase } = makeSut()
    const error = new Error('Internal server error')
    jest.spyOn(usecase, 'handle').mockRejectedValueOnce(error)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(error))
  })
})
