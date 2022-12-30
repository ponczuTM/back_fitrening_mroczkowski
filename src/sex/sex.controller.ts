import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { RoleAtLeastAdmin } from 'src/auth/role.decorator';
import { AbstractController } from '../shared/abstract.controller';
import { SexRequestDto, SexResponseDto } from './dto/sex.dto';
import { Sex } from './entities/sex.entity';
import { SexService } from './sex.service';

@Controller('sex')
export class SexController extends AbstractController<Sex, SexRequestDto, SexResponseDto> {
  constructor(service: SexService) {
    super(service);
  }

  @Get()
  @RoleAtLeastAdmin
  async all(): Promise<SexResponseDto[]> {
    return await super.all();
  }

  @Get(":id")
  @RoleAtLeastAdmin
  async one(@Param("id") id: number): Promise<SexResponseDto> {
    return await super.one(id);
  }

  @Post()
  @HttpCode(201)
  @RoleAtLeastAdmin
  async create(@Body() dto: SexRequestDto): Promise<SexResponseDto> {
    return await super.create(dto);
  }

  @Put(":id")
  @RoleAtLeastAdmin
  async update(@Param("id") id: number, @Body() dto: SexRequestDto)
    : Promise<SexResponseDto> {
    return await super.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  @RoleAtLeastAdmin
  async delete(@Param("id") id: number): Promise<void> {
    await super.delete(id);
  }
}
