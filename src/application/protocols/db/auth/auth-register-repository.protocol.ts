import { UserType } from '@/domain/entities'

export interface IAuthRegisterRepository {
  findUserByEmail(email: string): Promise<IAuthRegisterRepository.User | null>
  addUser(user: IAuthRegisterRepository.AddUser): Promise<IAuthRegisterRepository.User | null>
}

export namespace IAuthRegisterRepository {
  export type User = Partial<UserType>

  export type AddUser = {
    email: string
    password: string
  }
}
