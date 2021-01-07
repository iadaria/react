import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restauraants.resolver';

@Module({
  providers: [RestaurantResolver],
})
export class RestaurantsModule {}
