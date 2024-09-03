import { FindAllUserUseCase } from '@/application/usecases/user'
import { postgres } from '@/infra/db/client/postgres-client'
import { UserRepository } from '@/infra/db/user/user-repository'
import { FindAllUserController } from '@/presentation/controllers/user'
import { IController } from '@/presentation/protocols/controller-protocol'

export const makeFindAllUserController = (): IController => {
  const postgresPool = postgres.getPool()
  const repository = new UserRepository(postgresPool)
  const usecase = new FindAllUserUseCase(repository)
  return new FindAllUserController(usecase)
}
