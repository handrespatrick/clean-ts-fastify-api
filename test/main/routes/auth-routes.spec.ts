import {
  makeAuthLoginController,
  makeAuthRegisterController,
} from "@/main/factories/auth";
import { authRoutes } from "@/main/routes";

const fastifyMock = {
  post: jest.fn(),
};

jest.mock("@/main/factories/auth", () => ({
  makeAuthLoginController: jest.fn(),
  makeAuthRegisterController: jest.fn(),
}));

describe("authRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register login route", async () => {
    const mockControllerHandle = jest
      .fn()
      .mockResolvedValue({ statusCode: 200, data: "login success" });
    (makeAuthLoginController as jest.Mock).mockReturnValue({
      handle: mockControllerHandle,
    });

    await authRoutes(fastifyMock as any);

    expect(fastifyMock.post).toHaveBeenCalledWith(
      "/login",
      expect.any(Function)
    );

    const [routePath, routeHandler] = fastifyMock.post.mock.calls[0];
    const mockReq = {};
    const mockReply = { code: jest.fn().mockReturnThis(), send: jest.fn() };
    await routeHandler(mockReq, mockReply);

    expect(mockControllerHandle).toHaveBeenCalledWith(mockReq);
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      statusCode: 200,
      data: "login success",
    });
  });

  it("should register register route", async () => {
    const mockControllerHandle = jest
      .fn()
      .mockResolvedValue({ statusCode: 201, data: "registration success" });
    (makeAuthRegisterController as jest.Mock).mockReturnValue({
      handle: mockControllerHandle,
    });

    await authRoutes(fastifyMock as any);

    expect(fastifyMock.post).toHaveBeenCalledWith(
      "/register",
      expect.any(Function)
    );

    const [routePath, routeHandler] = fastifyMock.post.mock.calls[1];
    const mockReq = {};
    const mockReply = { code: jest.fn().mockReturnThis(), send: jest.fn() };
    await routeHandler(mockReq, mockReply);

    expect(mockControllerHandle).toHaveBeenCalledWith(mockReq);
    expect(mockReply.code).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      statusCode: 201,
      data: "registration success",
    });
  });
});
