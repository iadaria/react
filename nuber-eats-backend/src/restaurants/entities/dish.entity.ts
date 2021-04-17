import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Restaurant } from './restaurant.enitity';

@ObjectType()
class DishOption {
  @Field((type) => String)
  name: string;

  @Field((type) => [String])
  options: string[];
}

@InputType('DishInputType', { isAbstract: true }) //fix error multiply
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5, 100)
  name: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => String)
  @Column()
  @IsString()
  photo: string;

  @Field((type) => String)
  @Column()
  @Length(5, 140)
  description: string;

  @Field((type) => Restaurant, { nullable: true }) // need add onDelete: 'SET NULL"
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Column({ type: 'json' })
  options: DishOption[];
}
