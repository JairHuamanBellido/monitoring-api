export class FileStorage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer | NodeJS.ReadableStream;
  size: number;
}
