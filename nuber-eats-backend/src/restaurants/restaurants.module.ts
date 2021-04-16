import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.enitity';
import { RestaurantService } from './restaurants.service';
import { CategoryRespository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRespository])],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
