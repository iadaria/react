import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.enitity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    // console.log(veganOnly);
    return [];
  }
  @Mutation((returns) => Boolean)
  createRestaurant(
    /* @Args('name') name: string,
    @Args('isVegan') isVegan: boolean,
    @Args('address') address: string,
    @Args('ownersName') ownsersName: string, */
    @Args() createRestaurantDto: CreateRestaurantDto,
  ): boolean {
    console.log(createRestaurantDto);
    return true;
  }
}
