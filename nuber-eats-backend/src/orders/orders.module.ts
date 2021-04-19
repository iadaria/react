import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { Restaurant } from 'src/restaurants/entities/restaurant.enitity';
import { OrderItem } from './entities/order-item';
import { Dish } from '../restaurants/entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Dish, Restaurant])],
  providers: [OrderResolver, OrdersService],
})
export class OrdersModule {}
