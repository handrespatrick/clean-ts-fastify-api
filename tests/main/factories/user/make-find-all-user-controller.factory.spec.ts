import { makeFindAllUserController } from '@/main/factories/user'
import { FindAllUserController } from '@/presentation/controllers/user'

describe('makeFindAllUserController', () => {
  it('Must return a valid instance of FindAllUserController', () => {
    const userController = makeFindAllUserController()
    expect(userController).toBeInstanceOf(FindAllUserController)
  })
})
