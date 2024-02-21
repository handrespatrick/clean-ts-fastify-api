import { makeFindByIdCategoryController } from "@/main/factories/categories";
import { FindByIdCategoryController } from "@/presentation/controllers/categories";

describe("makeFindByIdCategoryController", () => {
  test("Must return a valid instance of FindByIdCategoryController", () => {
    const userController = makeFindByIdCategoryController();

    expect(userController).toBeInstanceOf(FindByIdCategoryController);
  });
});
