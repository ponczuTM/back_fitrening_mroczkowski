import { AbstractEntity } from "../../shared/abstract.entity";
import { User } from "../../user/entities/user.entity";
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Target } from "../../target/entities/target.entity";
import { ScheduleItem } from "../../schedule_item/entities/schedule-item.entity";
import { Activity } from "src/activity/entities/activity.entity";

@Entity()
export class Schedule extends AbstractEntity {
    @ManyToMany(() => User, {
        lazy: false,
        eager: true
    })
    @JoinTable()
    commonUsers: User[];
    @ManyToOne(type => User, user => user.leaderUserSchedules, {
        lazy: false,
        eager: true
    })
    leaderUser: User;
    @ManyToOne(type => Target, target => target.schedules, {
        lazy: false,
        eager: true
    })
    target: Target;
    @OneToMany(type => ScheduleItem, item => item.schedule, {
        lazy: false,
        eager: true
    })
    items: ScheduleItem[];   
    @OneToMany(type => Activity, activity => activity.schedule)
    activities: Activity[];
}
