import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SqlModule } from './database/sql.module';
import { AuthModule, UserModule } from './modules';
import { TypesModule } from './modules/types/types.module';
import { SpecieModule } from './modules/specie/specie.module';
import { CustomerModule } from './modules/customer/customer.module';
import { PetModule } from './modules/pet/pet.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SqlModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
    TypesModule,
    SpecieModule,
    CustomerModule,
    PetModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
