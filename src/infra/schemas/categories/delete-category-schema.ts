export const deleteCategorySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  }
}
