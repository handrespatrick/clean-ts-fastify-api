import { makeUpdateUserController } from '@/main/factories/user'
import { UpdateUserController } from '@/presentation/controllers/user'

describe('makeUpdateUserController', () => {
  it('Must return a valid instance of UpdateUserController', () => {
    const userController = makeUpdateUserController()
    expect(userController).toBeInstanceOf(UpdateUserController)
  })
})
