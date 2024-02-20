import { IAuthRegisterUseCase } from "../../../domain/usecases/auth/auth-register-usecase";
import { IBcryptHasher } from "../../protocols/cryptography/bcrypt/bcrypt-protocol";
import { IAuthRegisterRepository } from "../../protocols/db/auth/auth-register-repository-protocol";

export class AuthRegisterService implements IAuthRegisterUseCase {
  constructor(
    private readonly _authRegisterRepository: IAuthRegisterRepository,
    private readonly _bcryptHasher: IBcryptHasher
  ) {}

  async authRegister(
    params: IAuthRegisterUseCase.Params
  ): Promise<string | null> {
    const existingUser = await this._authRegisterRepository.findUserByEmail(
      params.email
    );
    if (existingUser) {
      return "E-mail already in use";
    }

    const hashedPassword = await this._bcryptHasher.hash(params.password);
    const userId = await this._authRegisterRepository.addUser({
      email: params.email,
      password: hashedPassword,
    });

    return userId ? "User created successfully" : "User creation failed";
  }
}
