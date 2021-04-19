import { Field, Float, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.enitity';
import { Dish } from '../../restaurants/entities/dish.entity';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true }) //abstract input type
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  // many orders for the one customer
  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.orders, { onDelete: 'SET NULL', nullable: true })
  customer?: User;

  // many orders for the one diver
  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.rides, { onDelete: 'SET NULL', nullable: true })
  driver?: User;

  // many orders for one restaurant
  @Field((type) => Restaurant)
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;

  @Field((tyhpe) => [Dish])
  @ManyToMany((type) => Dish)
  @JoinTable()
  dishes: Dish[];

  @Field((type) => Float, { nullable: true })
  @Column({ nullable: true })
  total?: number;

  @Field((type) => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;
}
