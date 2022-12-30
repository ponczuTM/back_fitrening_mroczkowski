import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SqlQuery } from './entities/sql_query.entity';
import { SqlQueryDto } from './dto/sql_query.dto';
import { getManager } from 'typeorm';
import { RoleAtLeastAdmin, RoleAtLeastLeader } from 'src/auth/role.decorator';

@Controller('sql-executor')
export class SqlExecutorController {
  constructor() {}

  @Post()
  @RoleAtLeastLeader
  async create(@Body() sqlQueryDto: SqlQueryDto) {
    const manager = getManager();
    return await manager.query(sqlQueryDto.text);
  }
}
