import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from '../app.module';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { RoleRequestDto, RoleResponseDto } from './dto/role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService extends AbstractService<Role, RoleRequestDto, RoleResponseDto> {
  constructor(@InjectRepository(Role) repository: Repository<Role>) {
      super(repository, async e => await mapper(RoleResponseDto, e));
  }    
}
