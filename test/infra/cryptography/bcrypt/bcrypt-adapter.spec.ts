import { BcryptAdapter } from '@/infra/cryptography/bcrypt/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  const salt = 10

  let bcryptAdapter: BcryptAdapter

  beforeEach(() => {
    bcryptAdapter = new BcryptAdapter(salt)
  })

  describe('hash', () => {
    it('should hash the plaintext password', async () => {
      const plaintext = 'password123'
      const hashedPassword = 'hashedPassword123'

      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword as never)

      const result = await bcryptAdapter.hash(plaintext)

      expect(result).toBe(hashedPassword)
      expect(bcrypt.hash).toHaveBeenCalledWith(plaintext, salt)
    })

    it('should throw an error if hashing fails', async () => {
      const plaintext = 'password123'
      const errorMessage = 'Hashing failed'

      jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error(errorMessage) as never)

      await expect(bcryptAdapter.hash(plaintext)).rejects.toThrow(errorMessage)
    })
  })

  describe('compare', () => {
    it('should compare plaintext password with the digest', async () => {
      const plaintext = 'password123'
      const digest = 'hashedPassword123'

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

      const result = await bcryptAdapter.compare(plaintext, digest)

      expect(result).toBe(true)
      expect(bcrypt.compare).toHaveBeenCalledWith(plaintext, digest)
    })

    it('should return false if passwords do not match', async () => {
      const plaintext = 'password123'
      const digest = 'hashedPassword123'

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)

      const result = await bcryptAdapter.compare(plaintext, digest)

      expect(result).toBe(false)
      expect(bcrypt.compare).toHaveBeenCalledWith(plaintext, digest)
    })

    it('should throw an error if comparison fails', async () => {
      const plaintext = 'password123'
      const digest = 'hashedPassword123'
      const errorMessage = 'Comparison failed'

      jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error(errorMessage) as never)

      await expect(bcryptAdapter.compare(plaintext, digest)).rejects.toThrow(errorMessage)
    })
  })
})
