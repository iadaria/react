import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { LoginOutput, LoginInput } from './dtos/login.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      return this.userService.createAccount(createAccountInput);
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.userService.login(loginInput);
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Query(returns => User)
  me(@Context() context) {
    console.log(context);
  }
}