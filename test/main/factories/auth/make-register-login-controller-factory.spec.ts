import { makeAuthRegisterController } from '@/main/factories/auth'
import { AuthRegisterController } from '@/presentation/controllers/auth'

describe('makeAuthRegisterController', () => {
  test('Must return a valid instance of AuthRegisterController', () => {
    const userController = makeAuthRegisterController()

    expect(userController).toBeInstanceOf(AuthRegisterController)
  })
})
