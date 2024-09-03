import { IFindAllUserUseCase } from '@/domain/usecases/user'
import { FindAllUserController } from '@/presentation/controllers/user'
import { serverError, ok } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

type SutTypes = {
  usecase: IFindAllUserUseCase
  sut: IController
}

const makeSut = (): SutTypes => {
  class FindAllUserUseCaseStub implements IFindAllUserUseCase {
    async handle(): Promise<IFindAllUserUseCase.AllUsers> {
      return Promise.resolve([
        {
          id: '1',
          name: 'any_name',
          email: 'any_mail@mail.com',
          password: 'any_password'
        }
      ])
    }
  }
  const usecase = new FindAllUserUseCaseStub()
  const sut = new FindAllUserController(usecase)
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

describe('FindAllUserController', () => {
  it('should return 200 with the found User data if retrieval is successful', async () => {
    const { sut, usecase } = makeSut()
    const users = [
      { id: '1', name: 'any_name', email: 'any_mail@mail.com', password: 'any_password' },
      { id: '2', name: 'other_name', email: 'other_mail@mail.com', password: 'other_password' }
    ]
    jest.spyOn(usecase, 'handle').mockResolvedValueOnce(users)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok(users))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const { sut, usecase } = makeSut()
    const error = new Error('Internal server error')
    jest.spyOn(usecase, 'handle').mockRejectedValueOnce(error)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(error))
  })
})
