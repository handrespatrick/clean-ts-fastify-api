import { Auth } from "../../entities/auth";

export interface IAuthRegisterUseCase {
  authRegister(params: IAuthRegisterUseCase.Params): Promise<string | null>;
}

export namespace IAuthRegisterUseCase {
  export type Params = Auth;
}
