import { makeCreateUserController } from '@/main/factories/user'
import { CreateUserController } from '@/presentation/controllers/user'

describe('makeCreateUserController', () => {
  it('Must return a valid instance of CreateUserController', () => {
    const userController = makeCreateUserController()
    expect(userController).toBeInstanceOf(CreateUserController)
  })
})
