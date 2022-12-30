import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleRequestDto, RoleResponseDto } from './dto/role.dto';
import { AbstractController } from '../shared/abstract.controller';
import { Role } from './entities/role.entity';
import { RoleAtLeastAdmin } from 'src/auth/role.decorator';

@Controller('role')
export class RoleController extends AbstractController<Role, RoleRequestDto, RoleResponseDto> {
  constructor(service: RoleService) {
    super(service);
  }

  @Get()
  @RoleAtLeastAdmin
  async all(): Promise<RoleResponseDto[]> {
    return await super.all();
  }

  @Get(":id")
  @RoleAtLeastAdmin
  async one(@Param("id") id: number): Promise<RoleResponseDto> {
    return await super.one(id);
  }

  @Post()
  @HttpCode(201)
  @RoleAtLeastAdmin
  async create(@Body() dto: RoleRequestDto): Promise<RoleResponseDto> {
    return await super.create(dto);
  }

  @Put(":id")
  @RoleAtLeastAdmin
  async update(@Param("id") id: number, @Body() dto: RoleRequestDto)
    : Promise<RoleResponseDto> {
    return await super.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  @RoleAtLeastAdmin
  async delete(@Param("id") id: number): Promise<void> {
    await super.delete(id);
  }
}