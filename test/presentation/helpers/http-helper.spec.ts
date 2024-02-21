import {
  badRequest,
  unauthorized,
  notFound,
  conflict,
  serverError,
  ok,
  noContent,
} from "@/presentation/helpers/http-helper";

describe("HTTP Helper Functions", () => {
  describe("badRequest", () => {
    it("should return a 400 status code with the provided error", () => {
      const error = new Error("Bad request");
      const result = badRequest(error);
      expect(result.statusCode).toBe(400);
      expect(result.body).toBe(error);
    });
  });

  describe("unauthorized", () => {
    it("should return a 401 status code with the provided data", () => {
      const data = { message: "Unauthorized" };
      const result = unauthorized(data);
      expect(result.statusCode).toBe(401);
      expect(result.body).toBe(data);
    });
  });

  describe("notFound", () => {
    it("should return a 404 status code with the provided data", () => {
      const data = { message: "Not found" };
      const result = notFound(data);
      expect(result.statusCode).toBe(404);
      expect(result.body).toBe(data);
    });
  });

  describe("conflict", () => {
    it("should return a 409 status code with the provided data", () => {
      const data = "Conflict";
      const result = conflict(data);
      expect(result.statusCode).toBe(409);
      expect(result.body).toBe(data);
    });
  });

  describe("serverError", () => {
    it("should return a 500 status code with the provided error", () => {
      const error = new Error("Internal server error");
      const result = serverError(error);
      expect(result.statusCode).toBe(500);
      expect(result.body).toBe(error);
    });
  });

  describe("ok", () => {
    it("should return a 200 status code with the provided data", () => {
      const data = { message: "OK" };
      const result = ok(data);
      expect(result.statusCode).toBe(200);
      expect(result.body).toBe(data);
    });
  });

  describe("noContent", () => {
    it("should return a 204 status code with null body", () => {
      const result = noContent();
      expect(result.statusCode).toBe(204);
      expect(result.body).toBeNull();
    });
  });
});
