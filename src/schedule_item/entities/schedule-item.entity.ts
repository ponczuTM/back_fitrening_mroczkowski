import { Schedule } from "../../schedule/entities/schedule.entity";
import { AbstractEntity } from "../../shared/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";

export enum ScheduleItemKind {
    Cyclic,
    SingleAbsence,
    SinglePresence
}

@Entity()
export class ScheduleItem extends AbstractEntity {
    @Column()
    from: string;
    @Column()
    to: string;
    @Column()
    kind: ScheduleItemKind;
    @ManyToOne(type => Schedule, schedule => schedule.items)
    schedule: Schedule;
}
