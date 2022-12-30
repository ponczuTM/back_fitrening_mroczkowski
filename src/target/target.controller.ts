import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { RoleAtLeastAdmin } from 'src/auth/role.decorator';
import { AbstractController } from '../shared/abstract.controller';
import { TargetRequestDto, TargetResponseDto } from './dto/target.dto';
import { Target } from './entities/target.entity';
import { TargetService } from './target.service';

@Controller('target')
export class TargetController extends AbstractController<Target, TargetRequestDto, TargetResponseDto> {
  constructor(service: TargetService) {
    super(service);
  }

  @Post()
  @HttpCode(201)
  @RoleAtLeastAdmin
  async create(@Body() dto: TargetRequestDto): Promise<TargetResponseDto> {
    return await super.create(dto);
  }

  @Put(":id")
  @RoleAtLeastAdmin
  async update(@Param("id") id: number, @Body() dto: TargetRequestDto)
    : Promise<TargetResponseDto> {
    return await super.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  @RoleAtLeastAdmin
  async delete(@Param("id") id: number): Promise<void> {
    await super.delete(id);
  }
}
