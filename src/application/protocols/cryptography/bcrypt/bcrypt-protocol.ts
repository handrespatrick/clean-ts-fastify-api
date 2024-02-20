export interface IBcryptHasher {
  hash(plaintext: string): Promise<string>;
}

export interface IBcryptHashComparer {
  compare(plaitext: string, digest: string): Promise<boolean>;
}
