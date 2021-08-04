import { User } from '@domain/entity/user/User';
import { UserRepositoryPort } from '@domain/port/user/persistence/UserRepositoryPort';
import { GetUsersForAdminPort } from '@domain/port/user/usecase/GetUsersForAdminPort';
import { UsersForAdminUseCaseDto } from '@domain/usecase/user/dto/UserForAdminUseCaseDto';
import { GetUsersForAdminUseCase } from '@domain/usecase/user/GetUsersForAdminUseCase';

export class GetUsersForAdminService implements GetUsersForAdminUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}
  public async execute(payload: GetUsersForAdminPort): Promise<UsersForAdminUseCaseDto[]> {
    const users: User[] = await this.userRepository.findAllUsersForAdmin({ role: payload.role });

    return UsersForAdminUseCaseDto.newListFromUsersForAdmin(users);
  }
}
