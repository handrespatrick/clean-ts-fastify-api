export const createUserSchema = {
  body: {
    type: 'object',
    required: ['id', 'name', 'email', 'password'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' }
    }
  }
}
