import { FindByIdCategoryService } from "@/application/services/categories";
import { CategoryRepository } from "@/infra/db/categories/category-repository";
import { FindByIdCategoryController } from "@/presentation/controllers/categories";
import { IController } from "@/presentation/protocols/controller-protocol";

export const makeFindByIdCategoryController = (): IController => {
  const categoryRepository = new CategoryRepository();
  const categoryService = new FindByIdCategoryService(categoryRepository);
  return new FindByIdCategoryController(categoryService);
};
