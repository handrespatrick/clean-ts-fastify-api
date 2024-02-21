import env from '@/main/config/env'
import swaggerConfig from '@/main/docs/swagger'
import { authRoutes, categoryRoutes } from '@/main/routes'
import Swagger, { SwaggerOptions } from '@fastify/swagger'
import SwaggerUi from '@fastify/swagger-ui'
import fastify, { FastifyInstance } from 'fastify'

const app: FastifyInstance = fastify({ logger: true })

app.register(categoryRoutes, { prefix: '/category' })
app.register(authRoutes, { prefix: '/auth' })

app.register(Swagger, swaggerConfig as SwaggerOptions)
app.register(SwaggerUi)

app.listen({ port: env.port }, () => console.log(`Server is running on port ${env.port}`))
