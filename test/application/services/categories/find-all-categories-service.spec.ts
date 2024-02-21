import { IFindAllCategoriesRepository } from "@/application/protocols/db/categories";
import { FindAllCategoriesService } from "@/application/services/categories";

describe("FindAllCategoriesService", () => {
  let findAllCategoriesService: FindAllCategoriesService;
  let findAllCategoriesRepositoryMock: IFindAllCategoriesRepository;

  beforeEach(() => {
    findAllCategoriesRepositoryMock = {
      findAll: jest.fn(),
    };

    findAllCategoriesService = new FindAllCategoriesService(
      findAllCategoriesRepositoryMock
    );
  });

  describe("findAll", () => {
    it("should return all categories if found", async () => {
      const categories = [
        {
          categoria_id: 1,
          nome_categoria: "Category 1",
          descricao_categoria: "Description 1",
        },
        {
          categoria_id: 2,
          nome_categoria: "Category 2",
          descricao_categoria: "Description 2",
        },
      ];

      jest
        .spyOn(findAllCategoriesRepositoryMock, "findAll")
        .mockResolvedValueOnce(categories);

      const result = await findAllCategoriesService.findAll();

      expect(result).toEqual([
        { id: 1, name: "Category 1", description: "Description 1" },
        { id: 2, name: "Category 2", description: "Description 2" },
      ]);
    });
  });
});
