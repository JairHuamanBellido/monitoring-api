/* eslint-disable prettier/prettier */
import { UserRole } from '@core/enums/UserRoleEnum';
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { UserDITokens } from '@domain/di/user/UserDITokens';
import { FileStorage } from '@domain/entity/file/FileStorage';
import { CreateUserUseCase } from '@domain/usecase/user/CreateUserUseCase';
import { UserUseCaseDto } from '@domain/usecase/user/dto/UserUseCaseDto';
import { GetUserUseCase } from '@domain/usecase/user/GetUserUseCase';
import { UpdateUserUseCase } from '@domain/usecase/user/UpdateUserUseCase';
import { CreateUserAdapter } from '@infrastructure/adapters/usecase/user/CreateUserAdapter';
import { GetUserAdapter } from '@infrastructure/adapters/usecase/user/GetUserAdapter';
import { UpdateUserAdapter } from '@infrastructure/adapters/usecase/user/UpdateUserAdapter';
import { Body, Controller, Get, Inject, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpAuth } from '../auth/decorator/HttpAuth';
import { HttpUser } from '../auth/decorator/HttpUser';
import { HttpJwtAuthGuard } from '../auth/guard/HttpJwtGuard';
import { HttpJwtPayload } from '../auth/type/HttpAuthType';
import { Request as R} from "express"
import { HttpRestApiModelCreateUserBody } from './documentation/user/HttpRestApiModelCreateUserBody';
import { HttpRestApiModelUpdateUserBody } from './documentation/user/HttpRestApiModelUpdateUserBody';

@Controller('users')
export class UsersController {
  // Constructor

  constructor(
    @Inject(UserDITokens.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,

    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(UserDITokens.UpdateUserUseCase)
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get(':dni')
  public async findOneByDni(@Param('dni') dni: string): Promise<UserUseCaseDto> {
    const adapter: GetUserAdapter = await GetUserAdapter.new({ dni: dni });
    const user: UserUseCaseDto = await this.getUserUseCase.execute(adapter);

    return user;
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  public async createUser(@UploadedFile() file:FileStorage, @Req() req: R<any,any,HttpRestApiModelCreateUserBody>): Promise<WriteResourceUseCase> {

    const newFilename = `${req.body.dni}.${file.originalname.split('.')[1]}`
    file.originalname = newFilename;

    const adapter: CreateUserAdapter = await CreateUserAdapter.new({
      age:      req.body.age,
      avatar:   file,
      dni:      req.body.dni,
      email:    req.body.email,
      lastname: req.body.lastname,
      name:     req.body.name,
      rol:      req.body.rol,
      password: req.body.password,
      username: req.body.username,
    });

    return  await this.createUserUseCase.execute(adapter);
  }

  @HttpAuth(UserRole.ADMIN)
  @UseGuards(HttpJwtAuthGuard)
  @Put('/:id')
  public async updateUserFromAdmin(@Body() body: HttpRestApiModelUpdateUserBody, @Param('id') id: string, @HttpUser() httpUser:HttpJwtPayload): Promise<WriteResourceUseCase> {    
    const adapter: UpdateUserAdapter = await UpdateUserAdapter.new({
      id: parseInt(id),
      updatedBy: httpUser.dni,
      ...body
    });
    
    return await this.updateUserUseCase.execute(adapter);
  }

  @HttpAuth(UserRole.USER)
  @UseGuards(HttpJwtAuthGuard)
  @Put('/')
  public async updateUser(@Body() body: HttpRestApiModelUpdateUserBody,@HttpUser() httpUser: HttpJwtPayload): Promise<WriteResourceUseCase> {
    const adapter: UpdateUserAdapter = await UpdateUserAdapter.new({
      id: httpUser.id,
      updatedBy: httpUser.dni,
      ...body
    })

    return await this.updateUserUseCase.execute(adapter)
  }

}
