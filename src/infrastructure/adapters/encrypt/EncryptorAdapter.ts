/* eslint-disable prettier/prettier */
import { EncryptPort } from '@domain/port/encrypt/EncryptPort';
import { SystemConfig } from '@infrastructure/config/SystemConfig';
import { AES, enc } from 'crypto-js';

export class EncryptorAdapter implements EncryptPort {
  public decrypt(text: string): string {
    const decryptText: string = AES.decrypt(text, SystemConfig.CRYPTOJS_KEY).toString(enc.Utf8);
    return decryptText;
  }

  public encrypt(text: string): string {
    const encryptText: string = AES.encrypt(text, SystemConfig.CRYPTOJS_KEY).toString();
    return encryptText;
  }
}
