import { makeFindByIdUserController } from '@/main/factories/user'
import { FindByIdUserController } from '@/presentation/controllers/user'

describe('makeFindByIdUserController', () => {
  it('Must return a valid instance of FindByIdUserController', () => {
    const userController = makeFindByIdUserController()
    expect(userController).toBeInstanceOf(FindByIdUserController)
  })
})
