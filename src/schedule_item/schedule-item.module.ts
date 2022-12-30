import { Module } from '@nestjs/common';
import { ScheduleItemService } from './schedule-item.service';
import { ScheduleItemController } from './schedule-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleItem } from './entities/schedule-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ScheduleItem ])
  ],
  controllers: [ScheduleItemController],
  providers: [ScheduleItemService]
})
export class ScheduleItemModule {}
