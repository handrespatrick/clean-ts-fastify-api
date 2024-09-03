import { IFindByIdUserRepository } from '@/application/protocols/db/user'
import { IFindByIdUserUseCase } from '@/domain/usecases/user'

export class FindByIdUserUseCase implements IFindByIdUserUseCase {
  constructor(private readonly _findByIdUserRepository: IFindByIdUserRepository) {}

  async handle(id: string): Promise<IFindByIdUserUseCase.FindOneUser | null> {
    return await this._findByIdUserRepository.findById(id)
  }
}
