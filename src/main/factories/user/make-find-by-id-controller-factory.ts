import { FindByIdUserUseCase } from '@/application/usecases/user'
import { postgres } from '@/infra/db/client/postgres-client'
import { UserRepository } from '@/infra/db/user/user-repository'
import { FindByIdUserController } from '@/presentation/controllers/user'
import { IController } from '@/presentation/protocols/controller-protocol'

export const makeFindByIdUserController = (): IController => {
  const postgresPool = postgres.getPool()
  const repository = new UserRepository(postgresPool)
  const usecase = new FindByIdUserUseCase(repository)
  return new FindByIdUserController(usecase)
}
