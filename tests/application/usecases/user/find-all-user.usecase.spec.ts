import { IFindAllUserRepository } from '@/application/protocols/db/user'
import { FindAllUserUseCase } from '@/application/usecases/user'
import { IFindAllUserUseCase } from '@/domain/usecases/user'

type SutTypes = {
  repository: IFindAllUserRepository
  sut: IFindAllUserUseCase
}

const makeSut = (): SutTypes => {
  class FindAllUserRepositoryStub implements IFindAllUserRepository {
    async findAll(): Promise<IFindAllUserRepository.AllUsers> {
      return Promise.resolve([
        {
          id: '1',
          name: 'any_name',
          email: 'any_mail@mail.com',
          password: 'any_password'
        },
        {
          id: '2',
          name: 'other_name',
          email: 'other_mail@mail.com',
          password: 'other_password'
        }
      ])
    }
  }
  const repository = new FindAllUserRepositoryStub()
  const sut = new FindAllUserUseCase(repository)
  return { repository, sut }
}

describe('FindAllUserUseCase', () => {
  it('should return all users if found', async () => {
    const { sut } = makeSut()
    const result = await sut.handle()
    expect(result).toEqual([
      {
        id: '1',
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      },
      {
        id: '2',
        name: 'other_name',
        email: 'other_mail@mail.com',
        password: 'other_password'
      }
    ])
  })

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findAll').mockRejectedValueOnce(new Error())
    const promise = sut.handle()
    expect(promise).rejects.toThrow(new Error())
  })
})
