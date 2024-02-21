import { IDeleteCategoryUseCase } from "@/domain/usecases/categories";
import { DeleteCategoryController } from "@/presentation/controllers/categories";
import { serverError, ok, notFound } from "@/presentation/helpers/http-helper";

const mockRequest = {
  id: "1",
  params: { id: "1" },
  raw: {},
  query: {},
  log: {},
  body: {},
};

describe("DeleteCategoryController", () => {
  let deleteCategoryController: DeleteCategoryController;
  let mockDeleteCategoryUseCase: IDeleteCategoryUseCase;

  beforeEach(() => {
    mockDeleteCategoryUseCase = {
      delete: jest.fn(),
    };
    deleteCategoryController = new DeleteCategoryController(
      mockDeleteCategoryUseCase
    );
  });

  it("should call deleteCategoryUseCase with correct parameters", async () => {
    await deleteCategoryController.handle(mockRequest);

    expect(mockDeleteCategoryUseCase.delete).toHaveBeenCalledWith(1);
  });

  it("should return 200 with the deleted category data if deletion is successful", async () => {
    const deletedCategory = {
      id: 1,
      name: "Test Category",
      description: "Test Description",
    };

    jest
      .spyOn(mockDeleteCategoryUseCase, "delete")
      .mockResolvedValueOnce(deletedCategory);

    const result = await deleteCategoryController.handle(mockRequest);

    expect(result).toEqual(ok(deletedCategory));
  });

  it("should return 404 if category to delete is not found", async () => {
    const errorResult = { type: "error", message: "Category 1 not found" };

    jest
      .spyOn(mockDeleteCategoryUseCase, "delete")
      .mockResolvedValueOnce(errorResult);

    const result = await deleteCategoryController.handle(mockRequest);

    expect(result).toEqual(notFound(errorResult));
  });

  it("should return 500 if an unexpected error occurs", async () => {
    const error = new Error("Internal server error");

    jest
      .spyOn(mockDeleteCategoryUseCase, "delete")
      .mockRejectedValueOnce(error);

    const result = await deleteCategoryController.handle(mockRequest);

    expect(result).toEqual(serverError(error));
  });
});
