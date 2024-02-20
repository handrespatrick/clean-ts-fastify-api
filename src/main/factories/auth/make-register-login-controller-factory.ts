import { AuthRegisterService } from "../../../application/services/auth";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt/bcrypt-adapter";
import { AuthRepository } from "../../../infra/db/auth/auth-repository";
import { AuthRegisterController } from "../../../presentation/controllers/auth";
import { IController } from "../../../presentation/protocols/controller-protocol";

export const makeAuthRegisterController = (): IController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const authRepository = new AuthRepository();
  const authRegisterUseCase = new AuthRegisterService(
    authRepository,
    bcryptAdapter
  );
  return new AuthRegisterController(authRegisterUseCase);
};
