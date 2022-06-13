import { Controller, Get } from '@nestjs/common';
import { CustomersService } from '../setvices/customers/customers.service';

@Controller('ahihi')
export class ControllerController {
  constructor(private CustomersService: CustomersService) {}
  @Get('/a')
  getCustomer() {
    return this.CustomersService.findCustomer();
  }
}
