import { IDeleteUserRepository } from '@/application/protocols/db/user'
import { IDeleteUserUseCase } from '@/domain/usecases/user'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly _deleteUserRepository: IDeleteUserRepository) {}

  async handle(id: string): Promise<void> {
    const hasUser = await this._deleteUserRepository.findById(id)
    if (!hasUser) {
      throw new Error('User not found')
    }
    await this._deleteUserRepository.delete(id)
  }
}
