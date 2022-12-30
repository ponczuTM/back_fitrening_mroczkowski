import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from 'src/app.module';
import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { ScheduleItemRequestDto, ScheduleItemResponseDto } from './dto/schedule-item.dto';
import { ScheduleItem } from './entities/schedule-item.entity';

@Injectable()
export class ScheduleItemService extends AbstractService<ScheduleItem, ScheduleItemRequestDto, ScheduleItemResponseDto> {
  constructor(@InjectRepository(ScheduleItem) repository: Repository<ScheduleItem>) {
      super(repository, async e => await mapper(ScheduleItemResponseDto, e));
  }    
}
