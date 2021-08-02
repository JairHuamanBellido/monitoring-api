/* eslint-disable prettier/prettier */
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { Account } from '@domain/entity/account/Account';
import { User } from '@domain/entity/user/User';
import { AccountRepositoryPort } from '@domain/port/account/persistence/AccountRepositoryPort';
import { EncryptPort } from '@domain/port/encrypt/EncryptPort';
import { FileStoragePort } from '@domain/port/storage/FileStoragePort';
import { UserRepositoryPort } from '@domain/port/user/persistence/UserRepositoryPort';
import { CreateUserPort } from '@domain/port/user/usecase/CreateUserPort';
import { CreateUserUseCase } from '@domain/usecase/user/CreateUserUseCase';
import { HttpException, HttpStatus } from '@nestjs/common';


export class CreateUserService implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    
    private readonly accountRepository: AccountRepositoryPort,

    private readonly fileStorage:FileStoragePort,

    private readonly encryptorRepository:EncryptPort

  ) {}

  public async execute(payload: CreateUserPort): Promise<WriteResourceUseCase> {

    const doesUserExist = await this.userRepository.findUser({ dni: payload.dni, email: payload.email });

    if (doesUserExist) {
      throw new HttpException({ message: 'Entity already exist', code: HttpStatus.CONFLICT }, HttpStatus.CONFLICT);
    }

    const pathFile = await this.fileStorage.upload(payload.avatar)

    const user: User = new User({
      age       : payload.age,
      avatar    : pathFile,
      dni       : payload.dni,
      email     : payload.email,
      lastname  : payload.lastname,
      name      : payload.name,
      rol       : payload.rol,
      createdBy : payload.dni,
      createdAt : new Date(),
      
    });

    const userCreated = await this.userRepository.createUser(user);

    const account: Account = new Account({
      isBlocked : false,
      password  : this.encryptorRepository.encrypt(payload.password),
      username  : payload.username,
      createdAt : new Date(),
      createdBy : userCreated.getDni()
    })

    await this.accountRepository.createAccount(account,userCreated)
    
    return  { message: "Creado" }  
    
    
  }
}
