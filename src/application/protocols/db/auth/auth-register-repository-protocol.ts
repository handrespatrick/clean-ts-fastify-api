import { IAuthLoginRepository } from "./auth-login-repository-protocol";

export interface IAuthRegisterRepository {
  findUserByEmail(email: string): Promise<IAuthLoginRepository.Result>;
  addUser(
    userData: IAuthRegisterRepository.Params
  ): Promise<IAuthRegisterRepository.Result>;
}

export namespace IAuthRegisterRepository {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    cliente_id: number;
    email: string | null;
    username: string | null;
    senha: string | null;
    nome: string | null;
    cpf: string | null;
    telefone: string | null;
    data_nascimento: Date | null;
  } | null;
}
