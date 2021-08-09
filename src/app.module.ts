import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './application/user.module';
import { AuthModule } from '@application/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
})
export class AppModule {}
