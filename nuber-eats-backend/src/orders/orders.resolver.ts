import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderOutput, CreateOrderInput } from './dtos/create-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersOutput, GetOrdersInput } from './dtos/get-orders.dto';
import { OrdersService } from './orders.service';
import { NEW_PENDING_ORDER, PUB_SUB } from 'src/common/common.constants';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrdersService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

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

  @Query((returns) => GetOrderOutput)
  @Role(['Any'])
  async getOrder(
    @AuthUser() user: User,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.orderService.getOrder(user, getOrderInput);
  }

  @Query((returns) => EditOrderOutput)
  @Role(['Any'])
  async editOrder(
    @AuthUser() user: User,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.orderService.editOrder(user, editOrderInput);
  }

  @Subscription((reutrns) => Order, {
    filter: (payload, _, context): true => {
      console.log(payload);
      return true;
    },
  })
  @Role(['Owner'])
  pendingOrders() {
    return this.pubSub.asyncIterator(NEW_PENDING_ORDER);
  }
}

/*  @Mutation((returns) => Boolean)
  async potatoReady(@Args('potatoId') potatoId: number): Promise<boolean> {
    await this.pubSub.publish('hotPotatos', { readyPotato: potatoId });
    return true;
  }

  @Subscription((returns) => String, {
    filter: (payload, variable, context): boolean => {
      // console.log(payload, variable, context)
      return payload.readyPotato === variable.potatoId;
    },
    resolve: (payload, arg, context, info): any => {
      return `You potato with the id ${payload.readyPotato} is ready!`;
    },
  })
  @Role(['Any'])
  readyPotato(@Args('potatoId') potatoId: number) {
    //console.log(user);
    return this.pubSub.asyncIterator('hotPotatos');
  } */
