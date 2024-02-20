export interface IAuthLoginRepository {
  findUserByEmail(email: string): Promise<IAuthLoginRepository.Result>;
}

export namespace IAuthLoginRepository {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    cliente_id: number;
    email: string | null;
    username: string | null;
    senha: string;
    nome: string | null;
    cpf: string | null;
    telefone: string | null;
    data_nascimento: Date | null;
  } | null;
}
