import { IFindAllUserRepository } from '@/application/protocols/db/user'
import { IFindAllUserUseCase } from '@/domain/usecases/user'

export class FindAllUserUseCase implements IFindAllUserUseCase {
  constructor(private readonly _findAllUserRepository: IFindAllUserRepository) {}

  async handle(): Promise<IFindAllUserUseCase.AllUsers> {
    return await this._findAllUserRepository.findAll()
  }
}
