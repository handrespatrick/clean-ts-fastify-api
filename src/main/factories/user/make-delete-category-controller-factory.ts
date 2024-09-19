import { DeleteUserUseCase } from '@/application/usecases/user'
import { postgres } from '@/infra/db/client/postgres-client'
import { UserRepository } from '@/infra/db/user/user-repository'
import { DeleteUserController } from '@/presentation/controllers/user'
import { IController } from '@/presentation/protocols/controller-protocol'

export const makeDeleteUserController = (): IController => {
  const postgresPool = postgres.getPool()
  const repository = new UserRepository(postgresPool)
  const usecase = new DeleteUserUseCase(repository)
  return new DeleteUserController(usecase)
}