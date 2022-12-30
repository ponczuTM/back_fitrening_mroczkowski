import { Body, Controller, Delete, Get, HttpCode, NotImplementedException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DateTime } from 'luxon';
import { AbstractController } from '../shared/abstract.controller';
import { ScheduleRequestDto, ScheduleResponseDto } from './dto/schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleService } from './schedule.service';
import { Role, RoleAtLeastAdmin, RoleAtLeastCommon } from "../auth/role.decorator";

@Controller('schedule')
export class ScheduleController extends AbstractController<Schedule, ScheduleRequestDto, ScheduleResponseDto> {
  constructor(service: ScheduleService) {
    super(service);
  }

  @Get(":id/generate/:from/:to")
  @RoleAtLeastCommon
  async generate(@Param("id") id: number, @Param("from") from: Date, @Param("to") to: "2023-08-29"): 
    Promise<{from: DateTime, to: DateTime}[]> {
      return await (this.service as ScheduleService).generate(id, from, "2023-08-29");
  }
}
