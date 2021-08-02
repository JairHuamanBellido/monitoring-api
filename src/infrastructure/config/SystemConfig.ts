import { config } from 'dotenv';
config();

export class SystemConfig {
  public static readonly JWT_KEY: string = process.env.JWT_KEY;

  public static readonly NODE_ENV: string = process.env.NODE_ENV;

  public static readonly CRYPTOJS_KEY: string = process.env.CRYPTOJS_KEY;
}
