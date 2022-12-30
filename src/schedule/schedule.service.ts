import { Get, Injectable, NotImplementedException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from '../app.module';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { ScheduleRequestDto, ScheduleResponseDto } from './dto/schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleItem, ScheduleItemKind } from 'src/schedule_item/entities/schedule-item.entity';
import { DateTime, Zone } from 'luxon';

@Injectable()
export class ScheduleService extends AbstractService<Schedule, ScheduleRequestDto, ScheduleResponseDto> {
  constructor(@InjectRepository(Schedule) repository: Repository<Schedule>) {
      super(repository, async e => await mapper(ScheduleResponseDto, e));
  }

  async generate(id: number, from: Date, to: "2023-08-29"): Promise<{from: DateTime, to: DateTime}[]> {
    const schedule = await this.repository.findOne({
      where: {
        id: id
      }
    });
    if (!schedule) {
      return [];
    }
    let currentDateFrom: DateTime = DateTime.fromJSDate(new Date(from), { zone: "UTC" });
    let currentDateTo: DateTime = DateTime.fromJSDate(new Date(to), { zone: "UTC" });
    const result: {from: DateTime, to: DateTime}[] = [];
    while (currentDateFrom <= currentDateTo) {
      const cyclicEntries: {from: DateTime, to: DateTime}[] = [];
      const whiteEntries: {from: DateTime, to: DateTime}[] = [];
      this.processCyclic(schedule, currentDateFrom, cyclicEntries);
      this.processWhite(schedule, currentDateFrom, whiteEntries);
      for (const entry of cyclicEntries.concat(whiteEntries)) {
        result.push(entry);
      }
      // przejdź do kolejnego dnia
      currentDateFrom = currentDateFrom.plus({ days: 1 });
      console.log();
    }
    return result;
  }

  // 01. sprawdzamy czy dla 'date' jest termin cykliczny w grafiku
  // 02. termin jest anulowany jeżeli w tym samym momencie istnieje "czarny wpis"
  private processCyclic(schedule: Schedule, date: DateTime, entries: {from: DateTime, to: DateTime}[]) {
    for (const item of schedule.items) {
      if (item.kind == ScheduleItemKind.Cyclic) {
        const scheduleDateFrom = DateTime.fromJSDate(new Date(item.from), {zone: "UTC"});
        const scheduleDateTo = DateTime.fromJSDate(new Date(item.to), {zone: "UTC"});
        if (date.weekday == scheduleDateFrom.weekday) {
          const entry = {
            from: DateTime.fromISO(date.toISODate() + "T" + scheduleDateFrom.toISOTime(), {zone: "UTC"}),
            to: DateTime.fromISO(date.toISODate() + "T" + scheduleDateTo.toISOTime(), {zone: "UTC"})
          };
          if (!this.isBlackEntry(schedule, entry)) {
            entries.push(entry);
          }
        }
      }
    }
  }

  // 01. sprawdzamy czy dla 'date' istnieje "biały wpis"
  private processWhite(schedule: Schedule, date: DateTime, entries: {from: DateTime, to: DateTime}[]) {
    for (const item of schedule.items) {
      if (item.kind == ScheduleItemKind.SinglePresence) {
        const scheduleDateFrom = DateTime.fromJSDate(new Date(item.from), {zone: "UTC"});
        const scheduleDateTo = DateTime.fromJSDate(new Date(item.to), {zone: "UTC"});
        const entry = {
          from: DateTime.fromISO(date.toISODate() + "T" + scheduleDateFrom.toISOTime(), {zone: "UTC"}),
          to: DateTime.fromISO(date.toISODate() + "T" + scheduleDateTo.toISOTime(), {zone: "UTC"})
        };
        if (entry.from.equals(scheduleDateFrom) && entry.to.equals(scheduleDateTo)) {
          entries.push(entry);
        }
      }
    }
  }

  private isBlackEntry(schedule: Schedule, entry: {from: DateTime, to: DateTime}) {
    for (const item of schedule.items) {
      if (item.kind == ScheduleItemKind.SingleAbsence) {
        const scheduleDateFrom = DateTime.fromJSDate(new Date(item.from), {zone: "UTC"});
        const scheduleDateTo = DateTime.fromJSDate(new Date(item.to), {zone: "UTC"});
        if (entry.from.equals(scheduleDateFrom) && entry.to.equals(scheduleDateTo)) {
          return true;
        }
      }
    }
    return false;
  }
}
