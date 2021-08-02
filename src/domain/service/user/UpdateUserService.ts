/* eslint-disable prettier/prettier */
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { User } from '@domain/entity/user/User';
import { UserRepositoryPort } from '@domain/port/user/persistence/UserRepositoryPort';
import { UpdateUserPort } from '@domain/port/user/usecase/UpdateUserPort';
import { UpdateUserUseCase } from '@domain/usecase/user/UpdateUserUseCase';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateUserService implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: UpdateUserPort): Promise<WriteResourceUseCase> {
    const user: User = await this.userRepository.findUser({ id: payload.id });

    if (!user) {
      throw new HttpException({ message: 'Entity not found', code: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }

    user.edit({
        age       : payload.age,
        avatar    : payload.avatar,
        dni       : payload.dni,
        email     : payload.email,
        lastname  : payload.lastname,
        name      : payload.name,
        rol       : payload.rol,
        updatedBy : payload.updatedBy
      });

    await this.userRepository.updateUser(user);

    return { message: 'El usuarios ha sido correctamente actualizado' };
  }
}
