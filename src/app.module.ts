import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { RoleModule } from './role/role.module';
import { TargetModule } from './target/target.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ActivityModule } from './activity/activity.module';
import { SexModule } from './sex/sex.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Activity } from './activity/entities/activity.entity';
import { DbInitializer } from './shared/db.initializer';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Department } from './department/entities/department.entity';
import { Role } from './role/entities/role.entity';
import { Schedule } from './schedule/entities/schedule.entity';
import { Sex } from './sex/entities/sex.entity';
import { Target } from './target/entities/target.entity';
import { User } from './user/entities/user.entity';
import { ScheduleItemModule } from './schedule_item/schedule-item.module';
import { ScheduleItem } from './schedule_item/entities/schedule-item.entity';
import { APP_GUARD } from '@nestjs/core';
import { BasicStrategy } from 'passport-http';
import { AuthGuard } from './auth/auth.guard';
import { SqlExecutorModule } from './sql_executor/sql_executor.module';

export const mapper = plainToClass;

@Module({
  imports: [
    UserModule, 
    DepartmentModule, 
    RoleModule, 
    TargetModule, 
    ScheduleModule,
    ScheduleItemModule, 
    ActivityModule, 
    SexModule, 
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "fitrening.db",
      logging: false,
      entities: [ __dirname + "/**/*.entity.js"],
      synchronize: true,
      dropSchema: true
    }),
    TypeOrmModule.forFeature([User]),
    SqlExecutorModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule { 
  constructor() {
  }
}
