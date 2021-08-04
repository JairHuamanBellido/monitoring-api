/* eslint-disable prettier/prettier */
import { AccountDITokens } from '@domain/di/account/AccountDIToken';
import { EncryptDITokens } from '@domain/di/encrypt/EncryptDITokens';
import { FileStorageDITokens } from '@domain/di/storage/FileStorageDITokens';
import { UserDITokens } from '@domain/di/user/UserDITokens';
import { AccountRepositoryPort } from '@domain/port/account/persistence/AccountRepositoryPort';
import { EncryptPort } from '@domain/port/encrypt/EncryptPort';
import { FileStoragePort } from '@domain/port/storage/FileStoragePort';
import { UserRepositoryPort } from '@domain/port/user/persistence/UserRepositoryPort';
import { CreateAccountService } from '@domain/service/account/CreateAccountService';
import { CreateUserService } from '@domain/service/user/CreateUserService';
import { GetUsersForAdminService } from '@domain/service/user/GetUsersForAdminService';
import { GetUserService } from '@domain/service/user/GetUserService';
import { UpdateUserService } from '@domain/service/user/UpdateUserService';
import { EncryptorAdapter } from '@infrastructure/adapters/encrypt/EncryptorAdapter';
import { FileStorageAdapter } from '@infrastructure/adapters/storage/FileStorageAdapter';
import { TypeormAccountRepositoryAdapter } from '@infrastructure/database/repositories/account/AccountRepository';
import { TypeOrmUserRepositoryAdapter } from '@infrastructure/database/repositories/user/UserRepository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UsersController } from './api/controller/UserController';

const persistenceProviders: Provider[] = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(TypeOrmUserRepositoryAdapter),
    inject: [Connection],
  },
  {
    provide: AccountDITokens.AccountRepository,
    useFactory: (connection: Connection) => connection.getCustomRepository(TypeormAccountRepositoryAdapter),
    inject: [Connection],
  },
  {
    provide: FileStorageDITokens.FileStorageRepository,
    useClass: FileStorageAdapter,
  },
  {
    provide: EncryptDITokens.EncryptorRepository,
    useClass: EncryptorAdapter,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: UserDITokens.GetUserUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new GetUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (
      userRepository: UserRepositoryPort,
      accountRepository: AccountRepositoryPort,
      fileStorage: FileStoragePort,
      encryptorRepository: EncryptPort,
    ) =>
      new CreateUserService(
        userRepository,
        accountRepository,
        fileStorage,
        encryptorRepository,
      ),
    inject: [
      UserDITokens.UserRepository,
      AccountDITokens.AccountRepository,
      FileStorageDITokens.FileStorageRepository,
      EncryptDITokens.EncryptorRepository,
    ],
  },
  {
    provide: UserDITokens.UpdateUserUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new UpdateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.GetUsersForAdminUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new GetUsersForAdminService(userRepository),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: AccountDITokens.CreateAccountUseCase,
    useFactory: (accountRepository: AccountRepositoryPort) => new CreateAccountService(accountRepository),
    inject: [AccountDITokens.AccountRepository],
  },
  
];

@Module({
  controllers: [UsersController],
  providers: [...persistenceProviders, ...useCaseProviders],
  exports: [UserDITokens.UserRepository, AccountDITokens.AccountRepository],
})
export class UserModule {}
