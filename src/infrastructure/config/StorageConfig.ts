import { config } from 'dotenv';
config();

export class StorageConfig {
  public static readonly AWS_ACCESS_KEY: string = process.env.AWS_ACCESS_KEY;

  public static readonly AWS_SECRET_KEY: string = process.env.AWS_SECRET_KEY;

  public static readonly AWS_S3_BUCKET: string = process.env.AWS_BUCKET;
}
