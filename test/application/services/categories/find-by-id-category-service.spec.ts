import { IFindByIdCategoryRepository } from "@/application/protocols/db/categories";
import { FindByIdCategoryService } from "@/application/services/categories";

describe("FindByIdCategoryService", () => {
  let findByIdCategoryService: FindByIdCategoryService;
  let findByIdCategoryRepositoryMock: IFindByIdCategoryRepository;

  beforeEach(() => {
    findByIdCategoryRepositoryMock = {
      findById: jest.fn(),
    };

    findByIdCategoryService = new FindByIdCategoryService(
      findByIdCategoryRepositoryMock
    );
  });

  describe("findById", () => {
    it("should return error message if category is not found", async () => {
      const categoryId = 123;

      jest
        .spyOn(findByIdCategoryRepositoryMock, "findById")
        .mockResolvedValueOnce(null);

      const result = await findByIdCategoryService.findById(categoryId);

      expect(result).toEqual({
        type: "error",
        message: `Category ${categoryId} not found`,
      });
    });

    it("should return category details if category is found", async () => {
      const categoryId = 123;
      const categoryDetails = {
        categoria_id: categoryId,
        nome_categoria: "Test Category",
        descricao_categoria: "Test Description",
      };

      jest
        .spyOn(findByIdCategoryRepositoryMock, "findById")
        .mockResolvedValueOnce(categoryDetails);

      const result = await findByIdCategoryService.findById(categoryId);

      expect(result).toEqual({
        id: categoryId,
        name: "Test Category",
        description: "Test Description",
      });
    });
  });
});
