import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// We are generating(why we use the code first method):
// 1 Graphql type - by @ObjectType decorator
// 2 Database table - by entity decorator - @Column decorator
// 3 Also - Dtos
@InputType({ isAbstract: true }) //abstract input type
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => Boolean, { nullable: true }) // or nullable: true
  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  isVegan: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  ownersName: string;

  @Field((type) => String, { defaultValue: 'Chita streen Lenina' })
  @Column()
  @IsString()
  categoryName: string;
}
