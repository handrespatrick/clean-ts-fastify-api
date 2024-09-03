import { IUpdateUserRepository } from '@/application/protocols/db/user'
import { UpdateUserUseCase } from '@/application/usecases/user'
import { IUpdateUserUseCase } from '@/domain/usecases/user'

type SutTypes = {
  repository: IUpdateUserRepository
  sut: IUpdateUserUseCase
}

const makeSut = (): SutTypes => {
  class UpdateUserRepositoryStub implements IUpdateUserRepository {
    async findById(): Promise<IUpdateUserRepository.FindUser> {
      return Promise.resolve({
        id: '1',
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
    }

    async update(): Promise<void> {
      return Promise.resolve()
    }
  }
  const repository = new UpdateUserRepositoryStub()
  const sut = new UpdateUserUseCase(repository)
  return { repository, sut }
}

const makeFakeInput = () => ({
  id: '1',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password'
})

describe('UpdateUserUseCase', () => {
  it('should return error message if user is not found', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(null)
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error('User not found'))
  })

  it('should throw if repository.findById method throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findById').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should throw if repository.update method throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should update user', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findById').mockResolvedValueOnce({
      id: '1',
      name: 'other_name',
      email: 'other_mail@mail.com',
      password: 'other_password'
    })
    const updateSpy = jest.spyOn(repository, 'update')
    await sut.handle(makeFakeInput())
    expect(updateSpy).toHaveBeenCalledWith({
      id: '1',
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })
})
