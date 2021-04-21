import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Payment } from 'src/payments/entities/payment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreatePaymentInput extends PickType(Payment, ['transactionId', 'restaurantId']) {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class CreatePaymentOutput extends CoreOutput {}
