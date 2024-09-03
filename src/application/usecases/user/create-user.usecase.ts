import { ICreateUserRepository } from '@/application/protocols/db/user'
import { User } from '@/domain/entities'
import { ICreateUserUseCase } from '@/domain/usecases/user'

export class CreateUserUsecase implements ICreateUserUseCase {
  constructor(private readonly _createUserRepository: ICreateUserRepository) {}

  async handle({ id, name, email, password }: ICreateUserUseCase.CreateUser): Promise<void> {
    const user = new User({ id, name, email, password })
    await this._createUserRepository.create(user)
  }
}
