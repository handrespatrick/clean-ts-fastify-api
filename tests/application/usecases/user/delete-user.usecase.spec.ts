import { IDeleteUserRepository } from '@/application/protocols/db/user'
import { DeleteUserUseCase } from '@/application/usecases/user'
import { IDeleteUserUseCase } from '@/domain/usecases/user'

type SutTypes = {
  repository: IDeleteUserRepository
  sut: IDeleteUserUseCase
}

const makeSut = (): SutTypes => {
  class DeleteUserRepositoryStub implements IDeleteUserRepository {
    async findById(): Promise<IDeleteUserRepository.FindUser> {
      return Promise.resolve({
        id: '1',
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
    }

    async delete(): Promise<void> {
      return Promise.resolve()
    }
  }
  const repository = new DeleteUserRepositoryStub()
  const sut = new DeleteUserUseCase(repository)
  return { repository, sut }
}

const makeFakeInput = () => '1'

describe('DeleteUserUseCase', () => {
  it('should return error if user with given id is not found', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(null)
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error('User not found'))
  })

  it('should call repository methods with correct parameters', async () => {
    const { sut, repository } = makeSut()
    const findSpy = jest.spyOn(repository, 'findById')
    const deleteSpy = jest.spyOn(repository, 'delete')
    await sut.handle(makeFakeInput())
    expect(findSpy).toHaveBeenCalledWith(makeFakeInput())
    expect(deleteSpy).toHaveBeenCalledWith(makeFakeInput())
  })

  it('should throw if DeleteUserRepository.findById throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findById').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should throw if DeleteUserRepository.delete throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeFakeInput())
    expect(promise).rejects.toThrow(new Error())
  })

  it('should return void if everything goes right', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeInput())
    expect(result).toBeUndefined()
  })
})
