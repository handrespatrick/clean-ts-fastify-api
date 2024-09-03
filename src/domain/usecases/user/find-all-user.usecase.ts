import { UserType } from '@/domain/entities'

export interface IFindAllUserUseCase {
  handle(): Promise<IFindAllUserUseCase.AllUsers>
}

export namespace IFindAllUserUseCase {
  export type AllUsers = UserType[]
}
