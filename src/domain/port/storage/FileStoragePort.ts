import { FileStorage } from '@domain/entity/file/FileStorage';

export interface FileStoragePort {
  upload(file: FileStorage): Promise<string>;
}
