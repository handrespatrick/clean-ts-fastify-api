import { ICreateUserRepository } from '@/application/protocols/db/user'
import { CreateUserUsecase } from '@/application/usecases/user'
import { User } from '@/domain/entities'
import { ICreateUserUseCase } from '@/domain/usecases/user'

type SutTypes = {
  repository: ICreateUserRepository
  sut: ICreateUserUseCase
}

const makeSut = (): SutTypes => {
  class CreateUserRepositoryStub implements ICreateUserRepository {
    async create(): Promise<void> {
      return Promise.resolve()
    }
  }
  const repository = new CreateUserRepositoryStub()
  const sut = new CreateUserUsecase(repository)
  return { repository, sut }
}

const makeFakeInput = () => ({
  id: '1',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password'
})

describe('CreateUsecaseService', () => {
  it('should call repository with correct parameters', async () => {
    const { sut, repository } = makeSut()
    const createSpy = jest.spyOn(repository, 'create')
    const user = new User({ ...makeFakeInput() })
    await sut.handle(makeFakeInput())
    expect(createSpy).toHaveBeenCalledWith(user)
  })

  it('should throw if CreateUsecaseRepository.create throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'create').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })
})
