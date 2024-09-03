import { UserType } from '@/domain/entities'

export interface IUpdateUserRepository {
  findById(id: string): Promise<IUpdateUserRepository.FindUser | null>
  update(user: IUpdateUserRepository.UpdateUser): Promise<void>
}

export namespace IUpdateUserRepository {
  export type FindUser = UserType
  export type UpdateUser = Partial<UserType>
}
