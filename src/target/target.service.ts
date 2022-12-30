import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/abstract.service';
import { TargetRequestDto, TargetResponseDto } from './dto/target.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mapper } from '../app.module';
import { Target } from './entities/target.entity';

@Injectable()
export class TargetService extends AbstractService<Target, TargetRequestDto, TargetResponseDto> {
  constructor(@InjectRepository(Target) repository: Repository<Target>) {
      super(repository, async e => await mapper(TargetResponseDto, e));
  }    
}