import { UserType } from '@/domain/entities'

export interface IDeleteUserRepository {
  findById(id: string): Promise<IDeleteUserRepository.FindUser | null>
  delete(id: string): Promise<void>
}

export namespace IDeleteUserRepository {
  export type FindUser = UserType
}
