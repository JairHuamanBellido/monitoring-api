/* eslint-disable prettier/prettier */
export class UserDITokens {
  // Use cases

  public static readonly GetUserUseCase: unique symbol = Symbol('GetUserUseCase');
  public static readonly CreateUserUseCase: unique symbol = Symbol('CreateUserUseCase');
  public static readonly UpdateUserUseCase: unique symbol = Symbol('UpdateUserUseCase');

  // Repository

  public static readonly UserRepository: unique symbol = Symbol('UserRepository');
}
