import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderItemInput, CreateOrderOutput } from './dtos/create-order.dto';
import { Restaurant } from 'src/restaurants/entities/restaurant.enitity';
import { OrderItem } from './entities/order-item';
import { Dish, DishOption } from '../restaurants/entities/dish.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,

    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,

    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  async createOrder(customer: User, { restaurantId, items }: CreateOrderInput): Promise<CreateOrderOutput> {
    const restaurant = await this.restaurants.findOne(restaurantId);
    if (!restaurant) {
      return { ok: false, error: 'Restaurant not found' };
    }

    for (const item of items) {
      const dish = await this.dishes.findOne(item.dishId);
      if (!dish) {
        return { ok: false, error: 'Dish not found' };
      }
      for (const itemOption of item.options) {
        const dishOption = dish.options.find((dishOption) => dishOption.name === itemOption.name);
        if (dishOption) {
          if (dishOption.extra) {
          } else {
            const dishOptionChoice = dishOption.choices.find(
              (optionChoice) => optionChoice.name === itemOption.choice,
            );
          }
        }
      }
      /*  await this.orderItems.save(
        this.orderItems.create({
          dish,
          options: item.options,
        }),
      ); */
    }
    //const order = this.orders.save(this.orders.create({ customer, restaurant }));

    return { ok: true };
  }
}
