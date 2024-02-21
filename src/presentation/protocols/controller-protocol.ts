export interface IController<T = IController.Params> {
  handle(request: T): Promise<IController.Result>
}

export namespace IController {
  export type Params = {
    id: string
    params: any
    raw: any
    query: any
    log: any
    body: any
  }
  export type Result = {
    statusCode: number
    body: any
  }
}
