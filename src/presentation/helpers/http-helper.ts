import { IController } from '@/presentation/protocols/controller-protocol'

export const badRequest = (error: Error): IController.Result => ({
  statusCode: 400,
  body: error
})

export const unauthorized = <T = any>(data: T): IController.Result => ({
  statusCode: 401,
  body: data
})

export const notFound = <T = any>(data: T): IController.Result => ({
  statusCode: 404,
  body: data
})

export const conflict = <T = string>(data: T): IController.Result => ({
  statusCode: 409,
  body: data
})

export const serverError = <T = any>(error: T): IController.Result => ({
  statusCode: 500,
  body: error
})

export const ok = <T = any>(data: T): IController.Result => ({
  statusCode: 200,
  body: data
})

export const noContent = (): IController.Result => ({
  statusCode: 204,
  body: null
})
