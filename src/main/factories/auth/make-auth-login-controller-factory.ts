import { AuthLoginService } from "../../../application/services/auth";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt/bcrypt-adapter";
import { JwtAdapter } from "../../../infra/cryptography/jwt/jwt-adapter";
import { AuthRepository } from "../../../infra/db/auth/auth-repository";
import { AuthLoginController } from "../../../presentation/controllers/auth";
import { IController } from "../../../presentation/protocols/controller-protocol";
import env from "../../config/env";

export const makeAuthLoginController = (): IController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const authRepository = new AuthRepository();
  const authLoginUseCase = new AuthLoginService(
    authRepository,
    bcryptAdapter,
    jwtAdapter
  );
  return new AuthLoginController(authLoginUseCase);
};
