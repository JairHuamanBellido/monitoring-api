import { User } from '@domain/entity/user/User';
import { UserRepositoryPort } from '@domain/port/user/persistence/UserRepositoryPort';
import { GetUsersByAdminPort } from '@domain/port/user/usecase/GetUsersByAdminPort';
import { UserUseCaseDto } from '@domain/usecase/user/dto/UserUseCaseDto';
import { GetUsersByAdminUseCase } from '@domain/usecase/user/GetUsersByAdminUseCase';

export class GetUsersByAdminService implements GetUsersByAdminUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  public async execute(payload: GetUsersByAdminPort): Promise<UserUseCaseDto[]> {
    const users: User[] = await this.userRepository.findAllUsersByAdmin({ role: payload.role });

    return UserUseCaseDto.newListFromUsers(users);
  }
}
