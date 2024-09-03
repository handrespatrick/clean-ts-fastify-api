import { UserType } from '@/domain/entities'

export interface IAuthLoginRepository {
  findUserByEmail(email: string): Promise<IAuthLoginRepository.User | null>
}

export namespace IAuthLoginRepository {
  export type User = Partial<UserType>
}
