import { Auth } from '@/domain/entities'

export interface IAuthLoginUseCase {
  handle(params: IAuthLoginUseCase.Params): Promise<IAuthLoginUseCase.Result>
}

export namespace IAuthLoginUseCase {
  export type Params = Auth

  export type Result = Partial<{
    accessToken: string
    email: string
    name: string
    type: 'error' | 'success'
    message: string
  }>
}
