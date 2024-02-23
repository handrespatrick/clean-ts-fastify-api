export const updateCategorySchema = {
  body: {
    type: 'object',
    required: ['name', 'description'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' }
    }
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  }
}
