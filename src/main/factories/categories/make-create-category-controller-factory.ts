import { CreateCategoryUseCase } from "../../../application/services/categories";
import { CategoryRepository } from "../../../infra/db/categories/category-repository";
import { CreateCategoryController } from "../../../presentation/controllers/categories";
import { IController } from "../../../presentation/protocols/controller-protocol";

export const makeCreateCategoryController = (): IController => {
  const categoryRepository = new CategoryRepository();
  const categoryUseCase = new CreateCategoryUseCase(categoryRepository);
  return new CreateCategoryController(categoryUseCase);
};
