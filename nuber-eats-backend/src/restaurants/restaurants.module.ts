import { Module } from '@nestjs/common';
import { CategoryResolver, DishResover, RestaurantResolver } from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.enitity';
import { RestaurantService } from './restaurants.service';
import { CategoryRespository } from './repositories/category.repository';
import { Dish } from './entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRespository, Dish])],
  providers: [RestaurantResolver, CategoryResolver, DishResover, RestaurantService],
})
export class RestaurantsModule {}
