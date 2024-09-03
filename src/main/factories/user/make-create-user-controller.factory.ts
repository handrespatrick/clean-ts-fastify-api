import { CreateUserUsecase } from '@/application/usecases/user'
import { postgres } from '@/infra/db/client/postgres-client'
import { UserRepository } from '@/infra/db/user/user-repository'
import { CreateUserController } from '@/presentation/controllers/user'
import { IController } from '@/presentation/protocols/controller-protocol'

export const makeCreateUserController = (): IController => {
  const postgresPool = postgres.getPool()
  const repository = new UserRepository(postgresPool)
  const usecase = new CreateUserUsecase(repository)
  return new CreateUserController(usecase)
}
