import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from 'src/entity/specie.entity';
import { Types } from 'src/entity/type.entity';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Specie, Types])],
  controllers: [SpecieController],
  providers: [SpecieService],
})
export class SpecieModule {}
