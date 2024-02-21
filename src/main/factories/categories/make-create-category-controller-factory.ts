import { CreateCategoryService } from '@/application/services/categories'
import { CategoryRepository } from '@/infra/db/categories/category-repository'
import { CreateCategoryController } from '@/presentation/controllers/categories'
import { IController } from '@/presentation/protocols/controller-protocol'

export const makeCreateCategoryController = (): IController => {
  const categoryRepository = new CategoryRepository()
  const categoryService = new CreateCategoryService(categoryRepository)
  return new CreateCategoryController(categoryService)
}
