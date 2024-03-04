import { authRoutes, categoryRoutes } from '@/main/routes'
import { FastifyInstance } from 'fastify'

export const registerRoutes = (app: FastifyInstance): void => {
  app.register(categoryRoutes, { prefix: '/category' })
  app.register(authRoutes, { prefix: '/auth' })
}
