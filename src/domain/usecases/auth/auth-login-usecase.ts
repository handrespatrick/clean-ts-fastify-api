import { Auth } from "../../entities/auth";

export interface IAuthLoginUseCase {
  authLogin(
    params: IAuthLoginUseCase.Params
  ): Promise<IAuthLoginUseCase.Result>;
}

export namespace IAuthLoginUseCase {
  export type Params = Auth;

  export type Result = Partial<{
    accessToken: string;
    email: string;
    name: string;
    type: "error" | "success";
    message: string;
  }>;
}
