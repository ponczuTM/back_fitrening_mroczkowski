import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { Activity } from './activity/entities/activity.entity';
import { AppModule } from './app.module';
import { Department } from './department/entities/department.entity';
import { Role } from './role/entities/role.entity';
import { Schedule } from './schedule/entities/schedule.entity';
import { ScheduleItem } from './schedule_item/entities/schedule-item.entity';
import { Sex } from './sex/entities/sex.entity';
import { DbInitializer } from './shared/db.initializer';
import { Target } from './target/entities/target.entity';
import { User } from './user/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  await initializeDb();
  await app.listen(process.env.PORT || 3000);
}
async function initializeDb() {
  const connection = getConnection();    
  const dbInitializer = new DbInitializer(
      connection.getRepository(Activity),
      connection.getRepository(Department),
      connection.getRepository(Role),
      connection.getRepository(Schedule),
      connection.getRepository(Sex),
      connection.getRepository(Target),
      connection.getRepository(User),
      connection.getRepository(ScheduleItem));
  await dbInitializer.initialize();
}
bootstrap();
