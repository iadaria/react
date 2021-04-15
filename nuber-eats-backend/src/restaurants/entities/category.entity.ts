import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from './restaurant.enitity';

// We are generating(why we use the code first method):
// 1 Graphql type - by @ObjectType decorator
// 2 Database table - by entity decorator - @Column decorator
// 3 Also - Dtos
@InputType({ isAbstract: true }) //abstract input type
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 100)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => [Restaurant]) //graphql syntax
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}
