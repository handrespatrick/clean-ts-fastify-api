import { UpdateCategoryUseCase } from "../../../application/services/categories";
import { CategoryRepository } from "../../../infra/db/categories/category-repository";
import { UpdateCategoryController } from "../../../presentation/controllers/categories";
import { IController } from "../../../presentation/protocols/controller-protocol";

export const makeUpdateCategoryController = (): IController => {
  const categoryRepository = new CategoryRepository();
  const categoryUseCase = new UpdateCategoryUseCase(categoryRepository);
  return new UpdateCategoryController(categoryUseCase);
};
