import { IFindByIdCategoryUseCase } from "@/domain/usecases/categories";
import { FindByIdCategoryController } from "@/presentation/controllers/categories";
import { serverError, ok, notFound } from "@/presentation/helpers/http-helper";

const mockRequest = {
  id: "1",
  params: { id: "1" },
  raw: {},
  query: {},
  log: {},
  body: {},
};

describe("FindByIdCategoryController", () => {
  let findByIdCategoryController: FindByIdCategoryController;
  let mockFindByIdCategoryUseCase: IFindByIdCategoryUseCase;

  beforeEach(() => {
    mockFindByIdCategoryUseCase = {
      findById: jest.fn(),
    };

    findByIdCategoryController = new FindByIdCategoryController(
      mockFindByIdCategoryUseCase
    );
  });

  it("should call findByIdCategoryUseCase with correct parameters", async () => {
    await findByIdCategoryController.handle(mockRequest);

    expect(mockFindByIdCategoryUseCase.findById).toHaveBeenCalledWith(1);
  });

  it("should return 200 with the found category data if retrieval is successful", async () => {
    const category = {
      id: 1,
      name: "Test Category",
      description: "Test Description",
    };

    jest
      .spyOn(mockFindByIdCategoryUseCase, "findById")
      .mockResolvedValueOnce(category);

    const result = await findByIdCategoryController.handle(mockRequest);

    expect(result).toEqual(ok(category));
  });

  it("should return 404 if category is not found", async () => {
    const errorResult = { type: "error", message: "Category 1 not found" };

    jest
      .spyOn(mockFindByIdCategoryUseCase, "findById")
      .mockResolvedValueOnce(errorResult);

    const result = await findByIdCategoryController.handle(mockRequest);

    expect(result).toEqual(notFound(errorResult));
  });

  it("should return 500 if an unexpected error occurs", async () => {
    const error = new Error("Internal server error");

    jest
      .spyOn(mockFindByIdCategoryUseCase, "findById")
      .mockRejectedValueOnce(error);

    const result = await findByIdCategoryController.handle(mockRequest);

    expect(result).toEqual(serverError(error));
  });
});
