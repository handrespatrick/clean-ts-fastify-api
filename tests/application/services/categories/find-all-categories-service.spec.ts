import { IFindAllCategoriesRepository } from '@/application/protocols/db/categories'
import { FindAllCategoriesService } from '@/application/services/categories'

describe('FindAllCategoriesService', () => {
  let service: FindAllCategoriesService
  let findAllCategoriesRepositoryMock: IFindAllCategoriesRepository

  beforeEach(() => {
    findAllCategoriesRepositoryMock = {
      findAll: jest.fn()
    }

    service = new FindAllCategoriesService(findAllCategoriesRepositoryMock)
  })

  describe('findAll', () => {
    it('should return all categories if found', async () => {
      const categories = [
        {
          categoria_id: 1,
          nome_categoria: 'Category 1',
          descricao_categoria: 'Description 1'
        },
        {
          categoria_id: 2,
          nome_categoria: 'Category 2',
          descricao_categoria: 'Description 2'
        }
      ]

      jest.spyOn(findAllCategoriesRepositoryMock, 'findAll').mockResolvedValueOnce(categories)

      const result = await service.findAll()

      expect(result).toEqual([
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' }
      ])
    })

    it('should throw if FindAllCategoriesRepository.findAll throws', async () => {
      jest.spyOn(findAllCategoriesRepositoryMock, 'findAll').mockRejectedValueOnce(new Error())

      const promise = service.findAll()

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
