import { IAuthLoginUseCase } from "../../../domain/usecases/auth/auth-login-usecase";
import { IBcryptHashComparer } from "../../protocols/cryptography/bcrypt/bcrypt-protocol";
import { IJwtEncrypter } from "../../protocols/cryptography/jwt/jwt-protocol";
import { IAuthLoginRepository } from "../../protocols/db/auth/auth-login-repository-protocol";

export class AuthLoginService implements IAuthLoginUseCase {
  constructor(
    private readonly _authLoginRepository: IAuthLoginRepository,
    private readonly _hashComparer: IBcryptHashComparer,
    private readonly _encrypter: IJwtEncrypter
  ) {}

  async authLogin({
    email,
    password,
  }: IAuthLoginUseCase.Params): Promise<IAuthLoginUseCase.Result> {
    const userAccount = await this._authLoginRepository.findUserByEmail(email);
    if (!userAccount) {
      return {
        type: "error",
        message: "E-mail not found",
      };
    }

    const isValidPassword = await this._hashComparer.compare(
      password,
      userAccount.senha
    );
    if (!isValidPassword) {
      return {
        type: "error",
        message: "Invalid password",
      };
    }

    const accessToken = await this._encrypter.encrypt({
      id: userAccount.cliente_id,
      name: userAccount.nome,
      email: userAccount.email,
    });

    return {
      type: "success",
      accessToken,
      message: "User logged in successfully",
    };
  }
}
