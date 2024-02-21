import { makeCreateCategoryController } from '@/main/factories/categories'
import { CreateCategoryController } from '@/presentation/controllers/categories'

describe('makeCreateCategoryController', () => {
  test('Must return a valid instance of CreateCategoryController', () => {
    const userController = makeCreateCategoryController()

    expect(userController).toBeInstanceOf(CreateCategoryController)
  })
})
