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
import { NEW_COOKED_ORDER, NEW_PENDING_ORDER, PUB_SUB } from 'src/common/common.constants';
import { OrderUpdatesInput } from './dtos/order-updates.dto';
import { NEW_ORDER_UPDATE } from '../common/common.constants';
import { TakeOrderOutput, TakeOrderInput } from './dtos/take-order.dto';

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

  @Mutation((returns) => EditOrderOutput)
  @Role(['Any'])
  async editOrder(
    @AuthUser() user: User,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.orderService.editOrder(user, editOrderInput);
  }

  @Subscription((returns) => Order, {
    filter: ({ pendingOrders: { ownerId } }, _, { user }): boolean => {
      console.log(ownerId, user.id);
      //return ownerId === 1;
      return ownerId === user.id;
    },
    resolve: ({ pendingOrders: { order } }) => order,
  })
  @Role(['Owner'])
  pendingOrders() {
    return this.pubSub.asyncIterator(NEW_PENDING_ORDER);
  }

  @Subscription((returns) => Order)
  @Role(['Delivery'])
  cookedOrders() {
    return this.pubSub.asyncIterator(NEW_COOKED_ORDER);
  }

  @Subscription((returns) => Order, {
    filter: (
      { orderUpdates: order }: { orderUpdates: Order },
      { input }: { input: OrderUpdatesInput }, // input from @Args('input')
      { user }: { user: User },
    ): boolean => {
      if (
        order.driverId !== user.id &&
        order.customerId !== user.id &&
        order.restaurant.ownerId !== user.id
      ) {
        return false;
      }
      return order.id === input.id;
    },
  })
  @Role(['Any'])
  orderUpdates(@Args('input') orderUpdatesInput: OrderUpdatesInput) {
    return this.pubSub.asyncIterator(NEW_ORDER_UPDATE);
  }

  @Mutation((returns) => TakeOrderOutput)
  @Role(['Delivery'])
  takeOrder(
    @AuthUser() user: User,
    @Args('input') takeOrderInput: TakeOrderInput,
  ): Promise<TakeOrderOutput> {
    return this.orderService.takeOrder(user, takeOrderInput);
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
