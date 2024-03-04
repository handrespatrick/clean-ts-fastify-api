import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'
import {
  createCategorySchema,
  deleteCategorySchema,
  findByIdCategorySchema,
  updateCategorySchema
} from '@/infra/schemas/categories'
import env from '@/main/config/env'
import {
  makeCreateCategoryController,
  makeDeleteCategoryController,
  makeFindAllCategoriesController,
  makeFindByIdCategoryController,
  makeUpdateCategoryController
} from '@/main/factories/categories'
import { FastifyInstance } from 'fastify'

export const categoryRoutes = async (app: FastifyInstance): Promise<void> => {
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
    schema: createCategorySchema,
    handler: async (req, reply) => {
      const controller = makeCreateCategoryController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })

  app.delete('/:id', {
    schema: deleteCategorySchema,
    handler: async (req, reply) => {
      const controller = makeDeleteCategoryController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })

  app.get('/', async (req, reply) => {
    const controller = makeFindAllCategoriesController()
    const result = await controller.handle(req)
    reply.code(result.statusCode).send(result)
  })

  app.get('/:id', {
    schema: findByIdCategorySchema,
    handler: async (req, reply) => {
      const controller = makeFindByIdCategoryController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })

  app.put('/:id', {
    schema: updateCategorySchema,
    handler: async (req, reply) => {
      const controller = makeUpdateCategoryController()
      const result = await controller.handle(req)
      reply.code(result.statusCode).send(result)
    }
  })
}
