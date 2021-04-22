import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.enitity';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePaymentOutput, CreatePaymentInput } from './dtos/create-payment.dto';
import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,

    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,

    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async createPayment(
    owner: User,
    { transactionId, restaurantId }: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);
      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found' };
      }
      if ((await restaurant).ownerId !== owner.id) {
        return { ok: false, error: 'You are not allowed to do this' };
      }
      await this.payments.save(this.payments.create({ transactionId, user: owner, restaurant }));
      restaurant.isPromoted = true;
      const date = new Date();
      date.setDate(date.getDate() + 7);
      restaurant.promotedUntil = date;
      this.restaurants.save(restaurant);
      return { ok: true };
    } catch {
      return { ok: true, error: 'Do not create payment' };
    }
  }

  async getPayments(user: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payments.find({ user });
      return { ok: true, payments };
    } catch {
      return { ok: false, error: 'Could not load payments' };
    }
  }

  @Cron('30 * * * * *', { name: 'myjog' })
  async checkForPayments() {
    const job = this.schedulerRegistry.getCronJob('myJob');
  }
}
