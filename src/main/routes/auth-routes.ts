import {
  makeAuthLoginController,
  makeAuthRegisterController,
} from "../factories/auth";
import { FastifyInstance } from "fastify";

export const authRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post("/login", async (req, reply) => {
    const controller = makeAuthLoginController();
    const result = await controller.handle(req);
    reply.code(result.statusCode).send(result);
  });

  fastify.post("/register", async (req, reply) => {
    const controller = makeAuthRegisterController();
    const result = await controller.handle(req);
    reply.code(result.statusCode).send(result);
  });
};
