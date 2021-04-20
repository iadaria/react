import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderOutput, CreateOrderInput } from './dtos/create-order.dto';
import { GetOrdersOutput, GetOrdersInput } from './dtos/get-orders.dto';
import { OrdersService } from './orders.service';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Mutation((returns) => CreateOrderOutput)
  @Role(['Client'])
  async createOrder(
    @AuthUser() customer: User,
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderInput);
  }

  @Query((returns) => GetOrdersOutput)
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(user, getOrdersInput);
  }
}
