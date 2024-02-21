import { prismaClient } from "@/infra/db/prisma-client";
import { PrismaClient } from "@prisma/client";

describe("prismaClient", () => {
  it("should create a new instance of PrismaClient", () => {
    expect(prismaClient).toBeInstanceOf(PrismaClient);
  });

  it("should have access to PrismaClient methods", () => {
    expect(typeof prismaClient.$connect).toBe("function");
    expect(typeof prismaClient.$disconnect).toBe("function");
  });
});
