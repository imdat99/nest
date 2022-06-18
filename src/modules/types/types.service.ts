import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import response from 'src/common/response/response-func';
import { Types } from 'src/entity/type.entity';
import { Repository } from 'typeorm';
import { getTypesDTO, TypesDTO } from './dto/types.dto';

@Injectable()
export class TypesService {
  constructor(@InjectRepository(Types) private typeRepo: Repository<Types>) {}

  async getType(getQuery?: getTypesDTO) {
    if (getQuery.search) {
      const searchData = await this.typeRepo
        .createQueryBuilder('Types')
        .where('Types.name like :name', { name: `%${getQuery.search}%` })
        .getMany();
      return response(200, searchData);
    }
    const type = await this.typeRepo.find({
      where: { id: getQuery?.id, name: getQuery.name },
    });
    return response(200, type);
  }

  async registerType(dto: TypesDTO) {
    const newType = await this.typeRepo.save(
      this.typeRepo.create({
        ...dto,
      }),
    );
    return response(200, newType);
  }
  async updateType(dto: TypesDTO, id: string) {
    const property = await this.typeRepo.findOneBy({ id });
    const res = await this.typeRepo.save({
      ...property, // existing fields
      ...dto, // updated fields
    });
    // delete res?.passWord;
    return response(200, res);
  }
  async deleteType(id: string) {
    await this.typeRepo.delete({ id });
    return response(200, '');
  }
}
