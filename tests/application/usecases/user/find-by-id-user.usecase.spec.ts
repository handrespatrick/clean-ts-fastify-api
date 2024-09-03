import { IFindByIdUserRepository } from '@/application/protocols/db/user'
import { FindByIdUserUseCase } from '@/application/usecases/user'
import { IFindByIdUserUseCase } from '@/domain/usecases/user'

type SutTypes = {
  repository: IFindByIdUserRepository
  sut: IFindByIdUserUseCase
}

const makeSut = (): SutTypes => {
  class FindByIdUserRepositoryStub implements IFindByIdUserRepository {
    async findById(): Promise<IFindByIdUserRepository.FindUser> {
      return Promise.resolve({
        id: '1',
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
    }
  }
  const repository = new FindByIdUserRepositoryStub()
  const sut = new FindByIdUserUseCase(repository)
  return { repository, sut }
}

const makeFakeInput = () => '1'

describe('FindByIdUserService', () => {
  it('should return User details if User is found', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findById')
    const result = await sut.handle(makeFakeInput())
    expect(result).toEqual({
      id: '1',
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  it('should call repository with correct parameters', async () => {
    const { sut, repository } = makeSut()
    const repositorySpy = jest.spyOn(repository, 'findById')
    await sut.handle(makeFakeInput())
    expect(repositorySpy).toHaveBeenCalledWith(makeFakeInput())
  })

  it('should throw if FindByIdUserRepository.findById throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findById').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })
})
