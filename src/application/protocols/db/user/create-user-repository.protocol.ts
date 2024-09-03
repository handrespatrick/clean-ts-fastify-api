import { UserType } from '@/domain/entities'

export interface ICreateUserRepository {
  create(data: ICreateUserRepository.CreateUser): Promise<void>
}

export namespace ICreateUserRepository {
  export type CreateUser = UserType
}
