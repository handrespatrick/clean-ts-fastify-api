import { makeFindAllCategoriesController } from "@/main/factories/categories";
import { FindAllCategoriesController } from "@/presentation/controllers/categories";

describe("makeFindAllCategoriesController", () => {
  test("Must return a valid instance of FindAllCategoriesController", () => {
    const userController = makeFindAllCategoriesController();

    expect(userController).toBeInstanceOf(FindAllCategoriesController);
  });
});
