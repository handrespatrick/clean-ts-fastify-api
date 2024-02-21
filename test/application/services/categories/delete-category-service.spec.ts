import { IDeleteCategoryRepository } from "@/application/protocols/db/categories";
import { DeleteCategoryService } from "@/application/services/categories";

describe("DeleteCategoryService", () => {
  let deleteCategoryService: DeleteCategoryService;
  let deleteCategoryRepositoryMock: IDeleteCategoryRepository;

  beforeEach(() => {
    deleteCategoryRepositoryMock = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    deleteCategoryService = new DeleteCategoryService(
      deleteCategoryRepositoryMock
    );
  });

  describe("delete", () => {
    it("should return error if category with given id is not found", async () => {
      const categoryId = 123;

      jest
        .spyOn(deleteCategoryRepositoryMock, "findById")
        .mockResolvedValueOnce(null);

      const result = await deleteCategoryService.delete(categoryId);

      expect(result).toEqual({
        type: "error",
        message: `Category ${categoryId} not found`,
      });
    });

    it("should delete a category and return its details", async () => {
      const categoryId = 123;
      const categoryToDelete = {
        categoria_id: categoryId,
        nome_categoria: "Test Category",
        descricao_categoria: "Test Description",
      };

      jest
        .spyOn(deleteCategoryRepositoryMock, "findById")
        .mockResolvedValueOnce(categoryToDelete);
      jest
        .spyOn(deleteCategoryRepositoryMock, "delete")
        .mockResolvedValueOnce(categoryToDelete);

      const result = await deleteCategoryService.delete(categoryId);

      expect(result).toEqual({
        id: categoryId,
        name: "Test Category",
        description: "Test Description",
      });
    });
  });
});
