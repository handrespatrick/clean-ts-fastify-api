import mySwagger from '@/main/swagger/swagger'
import Swagger, { SwaggerOptions } from '@fastify/swagger'
import SwaggerUi from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'

export const registerSwagger = (app: FastifyInstance): void => {
  app.register(Swagger, mySwagger as SwaggerOptions)
  app.register(SwaggerUi)
}
