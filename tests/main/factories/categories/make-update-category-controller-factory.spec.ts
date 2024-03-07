import { makeUpdateCategoryController } from '@/main/factories/categories'
import { UpdateCategoryController } from '@/presentation/controllers/categories'

describe('makeUpdateCategoryController', () => {
  test('Must return a valid instance of UpdateCategoryController', () => {
    const userController = makeUpdateCategoryController()

    expect(userController).toBeInstanceOf(UpdateCategoryController)
  })
})
