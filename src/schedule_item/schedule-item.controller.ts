import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { ScheduleItemRequestDto, ScheduleItemResponseDto } from './dto/schedule-item.dto';
import { AbstractController } from '../shared/abstract.controller';
import { ScheduleItem } from './entities/schedule-item.entity';
import { ScheduleItemService } from './schedule-item.service';
import { RoleAtLeastAdmin } from 'src/auth/role.decorator';

@Controller('schedule-item')
export class ScheduleItemController extends AbstractController<ScheduleItem, ScheduleItemRequestDto, ScheduleItemResponseDto> {
  constructor(service: ScheduleItemService) {
    super(service);
  }
}
