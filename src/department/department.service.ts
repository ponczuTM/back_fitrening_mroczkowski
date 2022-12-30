import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from '../app.module';
import { Repository } from 'typeorm';
import { AbstractService } from '../shared/abstract.service';
import { DepartmentRequestDto, DepartmentResponseDto } from './dto/department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService extends AbstractService<Department, DepartmentRequestDto, DepartmentResponseDto> {
  constructor(@InjectRepository(Department) repository: Repository<Department>) {
      super(repository, async e => await mapper(DepartmentResponseDto, e));
  }    
}
