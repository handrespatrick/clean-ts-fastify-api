import { makeDeleteUserController } from '@/main/factories/user'
import { DeleteUserController } from '@/presentation/controllers/user'

describe('makeDeleteUserController', () => {
  it('Must return a valid instance of DeleteUserController', () => {
    const userController = makeDeleteUserController()
    expect(userController).toBeInstanceOf(DeleteUserController)
  })
})
