import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import response from 'src/common/response/response-func';
import { Specie } from 'src/entity/specie.entity';
import { Types } from 'src/entity/type.entity';
import { Repository } from 'typeorm';
import { getSpeciesDTO, SpecieDTO } from './dto';

@Injectable()
export class SpecieService {
  constructor(
    @InjectRepository(Specie) private specieRepo: Repository<Specie>,
    @InjectRepository(Types) private typeRepo: Repository<Types>,
  ) {}

  async getSpecie(getSpeciesQuery: getSpeciesDTO) {
    if (getSpeciesQuery.search) {
      const searchData = await this.specieRepo
        .createQueryBuilder('Types')
        .where('Types.name like :name', { name: `%${getSpeciesQuery.search}%` })
        .getMany();
      return response(200, searchData);
    }
    const type = await this.specieRepo.find({
      where: { id: getSpeciesQuery?.id, name: getSpeciesQuery.name },
    });
    return response(200, type);
  }

  async createSpecie(specie: SpecieDTO) {
    const type = await this.typeRepo.findOne({
      where: { id: specie.idType },
      relations: ['species'],
    });
    delete specie.idType;
    const newSpecie = await this.specieRepo.create(specie as any);
    type.addSpecie(newSpecie as any);
    await this.typeRepo.save({ ...type });
    return response(200, newSpecie);
  }

  async updateSpecie(specie: SpecieDTO, id: string) {
    if (specie.idType) {
      const type = await this.typeRepo.findOne({
        where: { id: specie.idType },
        relations: ['species'],
      });
      const property = await this.specieRepo.findOneBy({ id });
      delete specie.idType;
      const update = await this.specieRepo.save({
        ...property,
        ...specie,
      });
      type.addSpecie(update as any);
      await this.typeRepo.save({ ...type });
      const updated = await this.specieRepo.findOneBy({ id });
      return response(200, updated);
    }
    const property = await this.specieRepo.findOneBy({ id });
    const updated = await this.specieRepo.save({
      ...property,
      ...specie,
    });
    return response(200, updated);
  }

  async deleteSpecie(id: string) {
    await this.specieRepo.delete({ id });
    return response(200, '');
  }
}
