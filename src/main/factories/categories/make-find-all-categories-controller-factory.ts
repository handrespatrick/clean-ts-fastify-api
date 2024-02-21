import { FindAllCategoriesService } from "@/application/services/categories";
import { CategoryRepository } from "@/infra/db/categories/category-repository";
import { FindAllCategoriesController } from "@/presentation/controllers/categories";
import { IController } from "@/presentation/protocols/controller-protocol";

export const makeFindAllCategoriesController = (): IController => {
  const categoryRepository = new CategoryRepository();
  const categoryService = new FindAllCategoriesService(categoryRepository);
  return new FindAllCategoriesController(categoryService);
};
