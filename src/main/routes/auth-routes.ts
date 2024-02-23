import { authLoginSchema, authRegisterSchema } from '@/infra/schemas/auth'
import { makeAuthLoginController, makeAuthRegisterController } from '@/main/factories/auth'
import { FastifyInstance } from 'fastify'

export const authRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/login', {
    schema: authLoginSchema,
    handler: async (req, reply) => {
      const controller = makeAuthLoginController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })

  fastify.post('/register', {
    schema: authRegisterSchema,
    handler: async (req, reply) => {
      const controller = makeAuthRegisterController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })
}
