import { IFindByIdUserUseCase } from '@/domain/usecases/user'
import { FindByIdUserController } from '@/presentation/controllers/user'
import { serverError, ok, notFound } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

type SutTypes = {
  usecase: IFindByIdUserUseCase
  sut: IController
}

const makeSut = (): SutTypes => {
  class FindByIdUserUseCaseStub implements IFindByIdUserUseCase {
    async handle(): Promise<IFindByIdUserUseCase.FindOneUser> {
      return Promise.resolve({
        id: '1',
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
    }
  }
  const usecase = new FindByIdUserUseCaseStub()
  const sut = new FindByIdUserController(usecase)
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

describe('FindByIdUserController', () => {
  it('should return 200 with the found User data if retrieval is successful', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(
      ok({
        id: '1',
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
    )
  })

  it('should return 404 if no User is found', async () => {
    const { sut, usecase } = makeSut()
    jest.spyOn(usecase, 'handle').mockResolvedValueOnce(null)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(notFound(null))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const { sut, usecase } = makeSut()
    const error = new Error('Internal server error')
    jest.spyOn(usecase, 'handle').mockRejectedValueOnce(error)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(error))
  })
})
