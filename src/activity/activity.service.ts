import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { ActivityRequestDto } from './dto/activity.dto';
import { ActivityResponseDto } from './dto/activity.dto';
import { Activity } from './entities/activity.entity';
import { mapper } from "../app.module";

@Injectable()
export class ActivityService extends AbstractService<Activity, ActivityRequestDto, ActivityResponseDto> {
    constructor(@InjectRepository(Activity) repository: Repository<Activity>) {
        super(repository, async e => await mapper(ActivityResponseDto, e));
    }    
}
