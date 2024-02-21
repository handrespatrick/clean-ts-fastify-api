import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter'
import { categoryRoutes } from '@/main/routes'
import { FastifyInstance } from 'fastify'
import { IController } from '@/presentation/protocols/controller-protocol'

jest.mock('@/infra/cryptography/jwt/jwt-adapter', () => ({
  JwtAdapter: jest.fn().mockImplementation(() => ({
    decrypt: jest.fn()
  }))
}))

describe('categoryRoutes', () => {
  let fastifyMock: FastifyInstance
  let makeCreateCategoryController: IController
  let makeDeleteCategoryController: IController
  let makeFindAllCategoriesController: IController
  let makeFindByIdCategoryController: IController
  let makeUpdateCategoryController: IController

  beforeEach(() => {
    makeCreateCategoryController = {
      handle: jest.fn()
    }
    makeDeleteCategoryController = {
      handle: jest.fn()
    }
    makeFindAllCategoriesController = {
      handle: jest.fn()
    }
    makeFindByIdCategoryController = {
      handle: jest.fn()
    }
    makeUpdateCategoryController = {
      handle: jest.fn()
    }

    fastifyMock = {
      addHook: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      get: jest.fn(),
      put: jest.fn()
    } as unknown as FastifyInstance
  })

  it('should add preHandler hook for authentication', async () => {
    await categoryRoutes(fastifyMock)

    expect(fastifyMock.addHook).toHaveBeenCalled()
    expect(fastifyMock.addHook).toHaveBeenCalledWith('preHandler', expect.any(Function))
  })

  it('should handle POST request to create category', async () => {
    jest.spyOn(makeCreateCategoryController, 'handle').mockResolvedValueOnce({
      statusCode: 200,
      body: { id: 1, name: 'Test Category', description: 'Test Description' }
    })

    await categoryRoutes(fastifyMock)

    expect(fastifyMock.post).toHaveBeenCalled()
  })

  it('should handle DELETE request to delete category', async () => {
    jest.spyOn(makeDeleteCategoryController, 'handle').mockResolvedValueOnce({
      statusCode: 204,
      body: {}
    })

    await categoryRoutes(fastifyMock)

    expect(fastifyMock.delete).toHaveBeenCalled()
  })

  it('should handle GET request to fetch all categories', async () => {
    jest.spyOn(makeFindAllCategoriesController, 'handle').mockResolvedValueOnce({
      statusCode: 200,
      body: []
    })

    await categoryRoutes(fastifyMock)

    expect(fastifyMock.get).toHaveBeenCalled()
  })

  it('should handle GET request to fetch category by ID', async () => {
    jest.spyOn(makeFindByIdCategoryController, 'handle').mockResolvedValueOnce({
      statusCode: 200,
      body: {}
    })

    await categoryRoutes(fastifyMock)

    expect(fastifyMock.get).toHaveBeenCalled()
  })

  it('should handle PUT request to update category', async () => {
    jest.spyOn(makeUpdateCategoryController, 'handle').mockResolvedValueOnce({
      statusCode: 200,
      body: {}
    })

    await categoryRoutes(fastifyMock)

    expect(fastifyMock.put).toHaveBeenCalled()
  })

  it('should return 401 if token is missing', async () => {
    const requestMock = { headers: {} }

    const replyMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    await categoryRoutes(fastifyMock)

    await (fastifyMock.addHook as jest.Mock).mock.calls[0][1](requestMock, replyMock)

    expect(replyMock.status).toHaveBeenCalledWith(401)
    expect(replyMock.send).toHaveBeenCalledWith({ error: 'Token is missing' })
  })

  it('should return 401 if token is invalid', async () => {
    const requestMock = { headers: { authorization: 'Bearer invalid_token' } }

    const replyMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }

    ;(JwtAdapter as jest.Mock).mockImplementationOnce(() => ({
      decrypt: jest.fn().mockRejectedValueOnce(new Error('Invalid token'))
    }))

    await categoryRoutes(fastifyMock)

    await (fastifyMock.addHook as jest.Mock).mock.calls[0][1](requestMock, replyMock)

    expect(replyMock.status).toHaveBeenCalledWith(401)
    expect(replyMock.send).toHaveBeenCalledWith({ error: 'Token is invalid' })
  })
})
