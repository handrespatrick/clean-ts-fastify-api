import { JwtAdapter } from "@/infra/cryptography/jwt/jwt-adapter";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("JwtAdapter", () => {
  const secret = "testSecret";

  let jwtAdapter: JwtAdapter;

  beforeEach(() => {
    jwtAdapter = new JwtAdapter(secret);
  });

  describe("encrypt", () => {
    it("should encrypt the plaintext payload", async () => {
      const plaintext = { id: "123", name: "John Doe" };
      const token = "encryptedToken";

      jest.spyOn(jwt, "sign").mockReturnValueOnce(token as never);

      const result = await jwtAdapter.encrypt(plaintext);

      expect(result).toBe(token);
      expect(jwt.sign).toHaveBeenCalledWith(plaintext, secret);
    });

    it("should throw an error if encryption fails", async () => {
      const plaintext = { id: "123", name: "John Doe" };
      const errorMessage = "Encryption failed";

      jest
        .spyOn(jwt, "sign")
        .mockRejectedValueOnce(new Error(errorMessage) as never);

      await expect(jwtAdapter.encrypt(plaintext)).rejects.toThrow(errorMessage);
    });
  });

  describe("decrypt", () => {
    it("should decrypt the token and return the payload", async () => {
      const token = "encryptedToken";
      const payload = { id: "123", name: "John Doe" };

      jest.spyOn(jwt, "verify").mockReturnValueOnce(payload as never);

      const result = await jwtAdapter.decrypt(token);

      expect(result).toEqual(payload);
      expect(jwt.verify).toHaveBeenCalledWith(token, secret);
    });

    it("should throw an error if decryption fails", async () => {
      const token = "encryptedToken";
      const errorMessage = "Decryption failed";

      jest
        .spyOn(jwt, "verify")
        .mockRejectedValueOnce(new Error(errorMessage) as never);

      await expect(jwtAdapter.decrypt(token)).rejects.toThrow(errorMessage);
    });
  });
});
