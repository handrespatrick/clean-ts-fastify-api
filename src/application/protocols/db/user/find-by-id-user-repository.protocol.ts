import { User } from '@/domain/entities'

export interface IFindByIdUserRepository {
  findById(id: string): Promise<IFindByIdUserRepository.FindUser | null>
}

export namespace IFindByIdUserRepository {
  export type FindUser = User
}
