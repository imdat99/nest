import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { CustomersService } from './setvices/customers/customers.service';

@Module({
  controllers: [ControllerController],
  providers: [CustomersService],
})
export class CustomersModule {}
