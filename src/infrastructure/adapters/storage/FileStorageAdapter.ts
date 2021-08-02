/* eslint-disable prettier/prettier */
import { FileStorage } from '@domain/entity/file/FileStorage';
import { FileStoragePort } from '@domain/port/storage/FileStoragePort';
import { StorageConfig } from '@infrastructure/config/StorageConfig';
import { S3 } from 'aws-sdk';

export class FileStorageAdapter implements FileStoragePort {
  public async upload(file: FileStorage): Promise<string> {
    const s3 = new S3();

    const fileResult = await s3.upload({
        Bucket:   StorageConfig.AWS_S3_BUCKET,
        Body:     file.buffer,
        Key:      `monitoring/${file.originalname}`,
        ACL:      'public-read',
    })

    return await (await fileResult.promise()).Location
  }
}
