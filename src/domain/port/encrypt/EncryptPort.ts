export interface EncryptPort {
  encrypt(text: string): string;
  decrypt(text: string): string;
}
