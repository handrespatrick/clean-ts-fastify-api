import { authRoutes, userRoutes } from '@/main/routes'
import { FastifyInstance } from 'fastify'

export const registerRoutes = (app: FastifyInstance): void => {
  app.register(userRoutes, { prefix: '/users' })
  app.register(authRoutes, { prefix: '/auth' })
}
