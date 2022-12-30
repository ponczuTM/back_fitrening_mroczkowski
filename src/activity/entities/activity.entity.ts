import { AbstractEntity } from "../../shared/abstract.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Schedule } from "../../schedule/entities/schedule.entity";

@Entity()
export class Activity extends AbstractEntity {
    @Column()
    moment: Date;
    
    @ManyToOne(type => Schedule, schedule => schedule.activities, {
        lazy: false,
        eager: true
    })
    schedule: Schedule;
    @ManyToOne(type => User, user => user.activities, {
        lazy: false,
        eager: true
    })
    user: User;
}
