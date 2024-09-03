import { UserType } from '@/domain/entities'

export interface IUpdateUserUseCase {
  handle(user: IUpdateUserUseCase.UpdateUser): Promise<void>
}

export namespace IUpdateUserUseCase {
  export type UpdateUser = Partial<UserType>
}
