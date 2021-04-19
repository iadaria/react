import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Dish, DishChoice, DishOption } from '../../restaurants/entities/dish.entity';

@InputType('OrderItemOptionInputType', { isAbstract: true }) //abstract input type
@ObjectType()
@Entity()
export class OrderItemOption extends CoreEntity {
  @Field((type) => String)
  name: string;

  @Field((type) => String, { nullable: true })
  choice?: string;

  @Field((type) => Int, { nullable: true })
  extra?: number; // price
}

@InputType('OrderInputType', { isAbstract: true }) //abstract input type
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'CASCADE' })
  dish: Dish;

  @Field((type) => [DishOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOption[];
}
