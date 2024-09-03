import { UserType } from '@/domain/entities'

export interface ICreateUserUseCase {
  handle(user: ICreateUserUseCase.CreateUser): Promise<void>
}

export namespace ICreateUserUseCase {
  export type CreateUser = UserType
}
