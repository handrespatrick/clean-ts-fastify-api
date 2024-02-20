export interface IJwtDecrypter {
  decrypt(ciphertext: string): Promise<string | JwtPayload>;
}

export interface IJwtEncrypter {
  encrypt(plaintext: object): Promise<string>;
}

type JwtPayload = {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
};
