import { Module } from '@nestjs/common';
import { SqlExecutorController } from './sql_executor.controller';

@Module({
  controllers: [SqlExecutorController]
})
export class SqlExecutorModule {}
