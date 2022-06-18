import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSubscriber } from 'src/entity/user.entity';
import { TypeSubscriber } from 'src/entity/type.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('SQL_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('SQL_USERNAME'),
        password: configService.get('SQL_PASSWORD'),
        database: configService.get('SQL_DB_NAME'),
        entities: [User],
        synchronize: true,
        subscribers: [UserSubscriber, TypeSubscriber],
        migrations: ['migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
      }),
    }),
  ],
})
export class SqlModule {}
