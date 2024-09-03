import { makeAuthLoginController } from '@/main/factories/auth'
import { AuthLoginController } from '@/presentation/controllers/auth'

describe('makeAuthLoginController', () => {
  it('Must return a valid instance of AuthLoginController', () => {
    const userController = makeAuthLoginController()
    expect(userController).toBeInstanceOf(AuthLoginController)
  })
})
