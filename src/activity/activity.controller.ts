import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { RoleAtLeastCommon } from 'src/auth/role.decorator';
import { AbstractController } from '../shared/abstract.controller';
import { ActivityService } from './activity.service';
import { ActivityRequestDto } from './dto/activity.dto';
import { ActivityResponseDto } from './dto/activity.dto';
import { Activity } from './entities/activity.entity';

@Controller('activity')
export class ActivityController extends AbstractController<Activity, ActivityRequestDto, ActivityResponseDto> {
  constructor(activityService: ActivityService) {
    super(activityService);
  }

  @Post()
  @HttpCode(201)
  @RoleAtLeastCommon
  async create(@Body() dto: ActivityRequestDto): Promise<ActivityResponseDto> {
    return await super.create(dto);
  }

  @Put(":id")
  @RoleAtLeastCommon
  async update(@Param("id") id: number, @Body() dto: ActivityRequestDto)
    : Promise<ActivityResponseDto> {
    return await super.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  @RoleAtLeastCommon
  async delete(@Param("id") id: number): Promise<void> {
    await super.delete(id);
  }
}
