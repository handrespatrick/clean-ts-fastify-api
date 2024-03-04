import { registerRoutes } from '@/main/config/routes'
import { registerSwagger } from '@/main/config/swagger'
import fastify, { FastifyInstance } from 'fastify'

const app: FastifyInstance = fastify({ logger: true })
registerRoutes(app)
registerSwagger(app)

export default app
