import { Auth } from '@/domain/entities'

export interface IAuthRegisterUseCase {
  authRegister(params: IAuthRegisterUseCase.Params): Promise<string | null>
}

export namespace IAuthRegisterUseCase {
  export type Params = Auth
}
