import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '../entities/order.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Order } from 'src/orders/entities/order.entity';

@InputType()
export class GetOrdersInput {
  @Field((type) => OrderStatus, { nullable: true })
  status?: OrderStatus;
}

@ObjectType()
export class GetOrdersOutput extends CoreOutput {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}
