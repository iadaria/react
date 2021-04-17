import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Category } from './category.entity';
import { User } from 'src/users/entities/user.entity';
import { Dish } from './dish.entity';

// We are generating(why we use the code first method):
// 1 Graphql type - by @ObjectType decorator
// 2 Database table - by entity decorator - @Column decorator
// 3 Also - Dtos
// Error: Schema must contain uniquely named types but contains multiple types named "Restaurant"
@InputType('RestaurantInputType', { isAbstract: true }) //abstract input type
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 100)
  name: string;

  /* @Field((type) => String)
  @Column()
  @IsString()
  bgImage: string; */

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => Category, { nullable: true }) // need add onDelete: 'SET NULL"
  @ManyToOne((type) => Category, (category) => category.restaurants, { nullable: true, onDelete: 'SET NULL' })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants, { onDelete: 'CASCADE' })
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field((type) => [Dish], { nullable: true }) //graphql syntax
  @OneToMany((type) => Dish, (dish) => dish.restaurant)
  menu: Dish[];
}
