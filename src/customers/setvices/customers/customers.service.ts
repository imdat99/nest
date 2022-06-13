import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  findCustomer() {
    return {
      success: true,
      msg: process.env.NEST_AH,
    };
  }
}
