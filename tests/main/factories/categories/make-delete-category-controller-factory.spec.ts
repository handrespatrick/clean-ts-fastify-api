import { makeDeleteCategoryController } from '@/main/factories/categories'
import { DeleteCategoryController } from '@/presentation/controllers/categories'

describe('makeDeleteCategoryController', () => {
  test('Must return a valid instance of DeleteCategoryController', () => {
    const userController = makeDeleteCategoryController()

    expect(userController).toBeInstanceOf(DeleteCategoryController)
  })
})
