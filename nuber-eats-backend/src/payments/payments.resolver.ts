import { Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';

@Resolver((of) => Payment)
export class PaymentResover {
  constructor(private readonly paymentService: PaymentService) {}

  test() {
    console.log();
  }
}
