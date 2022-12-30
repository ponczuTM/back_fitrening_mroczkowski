import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from '../app.module';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { SexRequestDto, SexResponseDto } from './dto/sex.dto';
import { Sex } from './entities/sex.entity';

@Injectable()
export class SexService extends AbstractService<Sex, SexRequestDto, SexResponseDto> {
  constructor(@InjectRepository(Sex) repository: Repository<Sex>) {
      super(repository, async e => await mapper(SexResponseDto, e));
  }    
}
