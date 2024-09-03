import { UpdateUserUseCase } from '@/application/usecases/user'
import { postgres } from '@/infra/db/client/postgres-client'
import { UserRepository } from '@/infra/db/user/user-repository'
import { UpdateUserController } from '@/presentation/controllers/user'
import { IController } from '@/presentation/protocols/controller-protocol'

export const makeUpdateUserController = (): IController => {
  const postgresPool = postgres.getPool()
  const repository = new UserRepository(postgresPool)
  const usecase = new UpdateUserUseCase(repository)
  return new UpdateUserController(usecase)
}
