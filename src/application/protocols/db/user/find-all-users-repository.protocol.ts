import { UserType } from '@/domain/entities'

export interface IFindAllUserRepository {
  findAll(): Promise<IFindAllUserRepository.AllUsers>
}

export namespace IFindAllUserRepository {
  export type AllUsers = UserType[]
}
