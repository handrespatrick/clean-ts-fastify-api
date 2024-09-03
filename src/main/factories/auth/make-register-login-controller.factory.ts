import { AuthRegisterUseCase } from '@/application/usecases/auth'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt/bcrypt-adapter'
import { AuthRepository } from '@/infra/db/auth/auth-repository'
import { postgres } from '@/infra/db/client/postgres-client'
import env from '@/main/config/env'
import { AuthRegisterController } from '@/presentation/controllers/auth'
import { IController } from '@/presentation/protocols/controller-protocol'

export const makeAuthRegisterController = (): IController => {
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const postgresPool = postgres.getPool()
  const authRepository = new AuthRepository(postgresPool)
  const authRegisterUseCase = new AuthRegisterUseCase(authRepository, bcryptAdapter)
  return new AuthRegisterController(authRegisterUseCase)
}
