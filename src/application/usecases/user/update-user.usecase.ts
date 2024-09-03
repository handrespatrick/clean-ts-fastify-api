import { IUpdateUserRepository } from '@/application/protocols/db/user'
import { User } from '@/domain/entities'
import { IUpdateUserUseCase } from '@/domain/usecases/user'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly _updateUserRepository: IUpdateUserRepository) {}

  async handle({ id, ...rest }: IUpdateUserUseCase.UpdateUser): Promise<void> {
    const user = await this._updateUserRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    const updatedUser = new User({ ...user, ...rest })
    await this._updateUserRepository.update(updatedUser)
  }
}
