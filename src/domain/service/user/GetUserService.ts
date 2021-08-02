/* eslint-disable prettier/prettier */
import { User } from '@domain/entity/user/User';
import { UserRepositoryPort } from '@domain/port/user/persistence/UserRepositoryPort';
import { GetUserPort } from '@domain/port/user/usecase/GetUserPort';
import { UserUseCaseDto } from '@domain/usecase/user/dto/UserUseCaseDto';
import { GetUserUseCase } from '@domain/usecase/user/GetUserUseCase';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetUserService implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: GetUserPort): Promise<UserUseCaseDto> {
    const user: User = await this.userRepository.findUser({ dni: payload.dni });

    if (!user) {
      throw new HttpException({ message: 'Entity NOT FOUND', code: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }

    return UserUseCaseDto.newFromUser(user);
  }
}
