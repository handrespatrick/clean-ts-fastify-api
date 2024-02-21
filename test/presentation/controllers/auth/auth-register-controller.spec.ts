import { IAuthRegisterUseCase } from "@/domain/usecases/auth";
import { AuthRegisterController } from "@/presentation/controllers/auth";
import { ok, serverError, conflict } from "@/presentation/helpers/http-helper";

const requestBody = {
  email: "test@example.com",
  password: "password123",
};

const mockRequest = {
  id: "1",
  params: {},
  raw: {},
  query: {},
  log: {},
  body: {
    email: "test@example.com",
    password: "password123",
  },
};

describe("AuthRegisterController", () => {
  let authRegisterController: AuthRegisterController;
  let mockAuthRegisterUseCase: IAuthRegisterUseCase;

  beforeEach(() => {
    mockAuthRegisterUseCase = {
      authRegister: jest.fn(),
    };

    authRegisterController = new AuthRegisterController(
      mockAuthRegisterUseCase
    );
  });

  it("should call authRegisterUsecase with correct parameters", async () => {
    const authResult = "User created successfully";

    jest
      .spyOn(mockAuthRegisterUseCase, "authRegister")
      .mockResolvedValueOnce(authResult);

    await authRegisterController.handle(mockRequest);

    expect(mockAuthRegisterUseCase.authRegister).toHaveBeenCalledWith(
      requestBody
    );
  });

  it("should return 200 with auth result if registration is successful", async () => {
    const authResult = "User created successfully";

    jest
      .spyOn(mockAuthRegisterUseCase, "authRegister")
      .mockResolvedValueOnce(authResult);

    const result = await authRegisterController.handle(mockRequest);

    expect(result).toEqual(ok(authResult));
  });

  it("should return 409 if registration fails due to duplicate email", async () => {
    const errorResult = "E-mail already in use";

    jest
      .spyOn(mockAuthRegisterUseCase, "authRegister")
      .mockResolvedValueOnce(errorResult);

    const result = await authRegisterController.handle(mockRequest);

    expect(result).toEqual(conflict(errorResult));
  });

  it("should return 500 if an unexpected error occurs", async () => {
    jest
      .spyOn(mockAuthRegisterUseCase, "authRegister")
      .mockRejectedValueOnce(new Error("Internal server error"));

    const result = await authRegisterController.handle(mockRequest);

    expect(result).toEqual(serverError(new Error("Internal server error")));
  });
});
