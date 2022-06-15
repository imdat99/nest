import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SqlModule } from './database/sql.module';
import { AuthModule, UserModule } from './modules';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SqlModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
