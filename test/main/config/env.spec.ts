import env from "@/main/config/env";

describe("env", () => {
  it("should have a log level property", () => {
    expect(env.logLevel).toBeDefined();
  });

  it('should default log level to "debug" if LOG_LEVEL environment variable is not set', () => {
    process.env.LOG_LEVEL = "";
    expect(env.logLevel).toBe("debug");
  });

  it("should have a port property", () => {
    expect(env.port).toBeDefined();
  });

  it("should default port to 3000 if PORT environment variable is not set", () => {
    process.env.PORT = "";
    expect(env.port).toBe(3000);
  });

  it("should have a jwt secret property", () => {
    expect(env.jwtSecret).toBeDefined();
  });

  it('should default jwt secret to "teste" if JWT_SECRET environment variable is not set', () => {
    process.env.JWT_SECRET = "";
    expect(env.jwtSecret).toBe("teste");
  });
});
