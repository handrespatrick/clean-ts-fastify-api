import { AuthLoginUseCase } from '@/application/usecases/auth'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'
import { AuthRepository } from '@/infra/db/auth/auth-repository'
import { postgres } from '@/infra/db/client/postgres-client'
import env from '@/main/config/env'
import { AuthLoginController } from '@/presentation/controllers/auth'
import { IController } from '@/presentation/protocols/controller-protocol'

export const makeAuthLoginController = (): IController => {
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const postgresPool = postgres.getPool()
  const authRepository = new AuthRepository(postgresPool)
  const authLoginUseCase = new AuthLoginUseCase(authRepository, bcryptAdapter, jwtAdapter)
  return new AuthLoginController(authLoginUseCase)
}
