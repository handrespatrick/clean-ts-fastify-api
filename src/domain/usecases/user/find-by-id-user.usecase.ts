import { UserType } from '@/domain/entities'

export interface IFindByIdUserUseCase {
  handle(id: string): Promise<IFindByIdUserUseCase.FindOneUser | null>
}

export namespace IFindByIdUserUseCase {
  export type FindOneUser = UserType
}
