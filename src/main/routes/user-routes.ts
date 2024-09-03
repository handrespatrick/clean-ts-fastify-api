import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'
import { createUserSchema, deleteUserSchema, findByIdUserSchema, updateUserSchema } from '@/infra/schemas/user'
import env from '@/main/config/env'
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeFindAllUserController,
  makeFindByIdUserController,
  makeUpdateUserController
} from '@/main/factories/user'
import { FastifyInstance } from 'fastify'

export const userRoutes = async (app: FastifyInstance): Promise<void> => {
  app.addHook('preHandler', async (req, reply) => {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return reply.status(401).send({ error: 'Token is missing' })
    }
    const [, token] = authorizationHeader.split(' ')
    try {
      const jwtAdapter = new JwtAdapter(env.jwtSecret)
      await jwtAdapter.decrypt(token)
    } catch (error) {
      return reply.status(401).send({ error: 'Token is invalid' })
    }
  })

  app.post('/', {
    schema: createUserSchema,
    handler: async (req, reply) => {
      const controller = makeCreateUserController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })

  app.delete('/:id', {
    schema: deleteUserSchema,
    handler: async (req, reply) => {
      const controller = makeDeleteUserController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })

  app.get('/', async (req, reply) => {
    const controller = makeFindAllUserController()
    const result = await controller.handle(req)
    reply.code(result.statusCode).send(result)
  })

  app.get('/:id', {
    schema: findByIdUserSchema,
    handler: async (req, reply) => {
      const controller = makeFindByIdUserController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })

  app.put('/:id', {
    schema: updateUserSchema,
    handler: async (req, reply) => {
      const controller = makeUpdateUserController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })
}
