import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Dish, DishOption } from '../../restaurants/entities/dish.entity';

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
