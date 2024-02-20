import { authRoutes, categoryRoutes } from "./main/routes";
import env from "./main/config/env";
import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify({ logger: true });

app.register(categoryRoutes, { prefix: "/category" });
app.register(authRoutes, { prefix: "/auth" });

app.listen({ port: env.port }, () =>
  console.log(`Server is running on port ${env.port}`)
);
