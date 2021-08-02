/* eslint-disable prettier/prettier */
import { AccountDITokens } from '@domain/di/account/AccountDIToken';
import { EncryptDITokens } from '@domain/di/encrypt/EncryptDITokens';
import { UserDITokens } from '@domain/di/user/UserDITokens';
import { AccountRepositoryPort } from '@domain/port/account/persistence/AccountRepositoryPort';
import { EncryptPort } from '@domain/port/encrypt/EncryptPort';
import { UserRepositoryPort } from '@domain/port/user/persistence/UserRepositoryPort';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpJwtPayload, HttpLoggedUser } from './type/HttpAuthType';

@Injectable()
export class HttpAuthService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(AccountDITokens.AccountRepository)
    private readonly accountRepository: AccountRepositoryPort,

    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,
    
    @Inject(EncryptDITokens.EncryptorRepository)
    private readonly encryptRepository: EncryptPort
  ) {}

  public async login(username: string, password:string): Promise<HttpLoggedUser> {

    const account = await this.accountRepository.findAccount({
      username: username,
    });   


    if (!account || password !== this.encryptRepository.decrypt(account.getPassword())) {
      throw new HttpException({ message: 'Credentials incorrect', code: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    if (account.getIsBlocked()) {
      throw new HttpException({ message: 'Account Blocked', code: HttpStatus.FORBIDDEN }, HttpStatus.FORBIDDEN);
    }

    const user = await this.userRepository.findUser({ dni: account.getCreatedBy()})

    const jwtPayload: HttpJwtPayload = {
      dni:      user.getCreatedBy(),
      id:       user.getId(),
      username: account.getUsername(),
      role:     user.getrol()
    };
    
    const token = this.jwtService.sign(jwtPayload);

    return { accessToken: token, id: user.getId()};
  }

  public async getUser(dni:string): Promise<boolean> {
    const user = await this.userRepository.findUser({dni: dni})
    
    return !user
  }
}
