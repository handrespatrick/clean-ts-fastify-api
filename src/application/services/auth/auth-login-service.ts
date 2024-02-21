import { IBcryptHashComparer } from "@/application/protocols/cryptography/bcrypt/bcrypt-protocol";
import { IJwtEncrypter } from "@/application/protocols/cryptography/jwt/jwt-protocol";
import { IAuthLoginRepository } from "@/application/protocols/db/auth";
import { IAuthLoginUseCase } from "@/domain/usecases/auth";

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
