/* eslint-disable prettier/prettier */
import { EncryptDITokens } from '@domain/di/encrypt/EncryptDITokens';
import { EncryptorAdapter } from '@infrastructure/adapters/encrypt/EncryptorAdapter';
import { SystemConfig } from '@infrastructure/config/SystemConfig';
import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpAuthService } from './api/auth/HttpAuthService';
import { HttpJwtStrategy } from './api/auth/passport/HttpJwtStrategy';
import { HttpLocalStrategy } from './api/auth/passport/HttpLocalStrategy';
import { AuthController } from './api/controller/AuthController';
import { UserModule } from './user.module';

const defaultProviders: Provider[] = [HttpJwtStrategy, HttpLocalStrategy, HttpAuthService];

const persistenceProviders: Provider[] = [
  {
    provide: EncryptDITokens.EncryptorRepository,
    useClass: EncryptorAdapter,
  },
];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: SystemConfig.JWT_KEY,
    }),
    UserModule,
  ],
  providers: [...defaultProviders, ...persistenceProviders],
  controllers: [AuthController],
})
export class AuthModule {}
