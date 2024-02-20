import {
  makeCreateCategoryController,
  makeDeleteCategoryController,
  makeFindAllCategoriesController,
  makeFindByIdCategoryController,
  makeUpdateCategoryController,
} from "../factories/categories";
import { JwtAdapter } from "../../infra/cryptography/jwt/jwt-adapter";
import env from "./../config/env";
import { FastifyInstance } from "fastify";

export const categoryRoutes = async (
  fastify: FastifyInstance
): Promise<void> => {
  fastify.addHook("preHandler", async (req, reply) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return reply.status(401).send({ error: "Token is missing" });
    }

    const [, token] = authorizationHeader.split(" ");
    try {
      const jwtAdapter = new JwtAdapter(env.jwtSecret);
      await jwtAdapter.decrypt(token);
    } catch (error) {
      return reply.status(401).send({ error: "Token is invalid" });
    }
  });

  fastify.post("/", async (req, reply) => {
    const controller = makeCreateCategoryController();
    const result = await controller.handle(req);
    reply.code(result.statusCode).send(result);
  });

  fastify.delete("/:id", async (req, reply) => {
    const controller = makeDeleteCategoryController();
    const result = await controller.handle(req);
    reply.code(result.statusCode).send(result);
  });

  fastify.get("/", async (req, reply) => {
    const controller = makeFindAllCategoriesController();
    const result = await controller.handle(req);
    reply.code(result.statusCode).send(result);
  });

  fastify.get("/:id", async (req, reply) => {
    const controller = makeFindByIdCategoryController();
    const result = await controller.handle(req);
    reply.code(result.statusCode).send(result);
  });

  fastify.put("/:id", async (req, reply) => {
    const controller = makeUpdateCategoryController();
    const result = await controller.handle(req);
    reply.code(result.statusCode).send(result);
  });
};
