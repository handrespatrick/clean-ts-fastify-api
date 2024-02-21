export default {
  openapi: {
    info: {
      title: 'ts-back-fastify',
      contact: {
        name: 'Github',
        url: 'https://github.com/handrespatrick/clean-ts-fastify-api'
      },
      version: '1.0',
      description:
        'Aplicação CRUD responsável por gerenciar a autenticação de usuários e o controle de acesso, além de permitir a gestão das tabelas.'
    },
    paths: {
      '/category': {
        post: {
          tags: ['category'],
          summary: 'create',
          operationId: 'create',
          parameters: [],
          requestBody: {
            description: '',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    {
                      $ref: '#/components/schemas/createrequest'
                    },
                    {
                      example: {
                        name: 'shorts',
                        description: 'shorts azul'
                      }
                    }
                  ]
                },
                example: {
                  name: 'shorts',
                  description: 'shorts azul'
                }
              }
            },
            required: true
          },
          responses: {
            '200': {
              description: '',
              headers: {}
            }
          },
          deprecated: false,
          security: [
            {
              bearer: []
            }
          ]
        },
        get: {
          tags: ['category'],
          summary: 'find-all',
          operationId: 'find-all',
          parameters: [],
          responses: {
            '200': {
              description: '',
              headers: {}
            }
          },
          deprecated: false,
          security: [
            {
              bearer: []
            }
          ]
        }
      },
      '/category/1': {
        get: {
          tags: ['category'],
          summary: 'find-by-id',
          operationId: 'find-by-id',
          parameters: [],
          responses: {
            '200': {
              description: '',
              headers: {}
            }
          },
          deprecated: false,
          security: [
            {
              bearer: []
            }
          ]
        },
        put: {
          tags: ['category'],
          summary: 'update',
          operationId: 'update',
          parameters: [],
          requestBody: {
            description: '',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    {
                      $ref: '#/components/schemas/updaterequest'
                    },
                    {
                      example: {
                        name: 'shorts',
                        description: 'shorts vermelho'
                      }
                    }
                  ]
                },
                example: {
                  name: 'shorts',
                  description: 'shorts vermelho'
                }
              }
            },
            required: true
          },
          responses: {
            '200': {
              description: '',
              headers: {}
            }
          },
          deprecated: false,
          security: [
            {
              bearer: []
            }
          ]
        },
        delete: {
          tags: ['category'],
          summary: 'update',
          operationId: 'Deleteupdate',
          parameters: [],
          responses: {
            '200': {
              description: '',
              headers: {}
            }
          },
          deprecated: false,
          security: [
            {
              bearer: []
            }
          ]
        }
      },
      '/auth/register': {
        post: {
          tags: ['auth'],
          summary: 'register',
          operationId: 'register',
          parameters: [],
          requestBody: {
            description: '',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    {
                      $ref: '#/components/schemas/registerrequest'
                    },
                    {
                      example: {
                        email: 'teste@mail.com',
                        password: '123'
                      }
                    }
                  ]
                },
                example: {
                  email: 'teste@mail.com',
                  password: '123'
                }
              }
            },
            required: true
          },
          responses: {
            '200': {
              description: '',
              headers: {}
            }
          },
          deprecated: false
        }
      },
      '/auth/login': {
        post: {
          tags: ['auth'],
          summary: 'get-token',
          operationId: 'get-token',
          parameters: [],
          requestBody: {
            description: '',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    {
                      $ref: '#/components/schemas/get-token-request'
                    },
                    {
                      example: {
                        email: 'teste@mail.com',
                        password: '123'
                      }
                    }
                  ]
                },
                example: {
                  email: 'teste@mail.com',
                  password: '123'
                }
              }
            },
            required: true
          },
          responses: {
            '200': {
              description: '',
              headers: {}
            }
          },
          deprecated: false
        }
      }
    },
    components: {
      schemas: {
        createrequest: {
          title: 'createrequest',
          required: ['name', 'description'],
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          },
          example: {
            name: 'shorts',
            description: 'shorts azul'
          }
        },
        updaterequest: {
          title: 'updaterequest',
          required: ['name', 'description'],
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          },
          example: {
            name: 'shorts',
            description: 'shorts vermelho'
          }
        },
        registerrequest: {
          title: 'registerrequest',
          required: ['email', 'password'],
          type: 'object',
          properties: {
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          },
          example: {
            email: 'teste@mail.com',
            password: '123'
          }
        },
        'get-token-request': {
          title: 'get-token-request',
          required: ['email', 'password'],
          type: 'object',
          properties: {
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          },
          example: {
            email: 'teste@mail.com',
            password: '123'
          }
        }
      },
      securitySchemes: {
        bearer: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    },
    security: [],
    tags: [
      {
        name: 'category'
      },
      {
        name: 'auth'
      }
    ]
  }
}
