import { AbstractEntity } from "../../shared/abstract.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Schedule } from "src/schedule/entities/schedule.entity";
import { Department } from "src/department/entities/department.entity";

@Entity()
export class Target extends AbstractEntity {
    @Column()
    name: string;
    @Column()
    location: string;

    @ManyToOne(type => Department, department => department.targets, {
        lazy: false,
        eager: true
    })
    department: Department;

    @OneToMany(type => Schedule, schedule => schedule.leaderUser)
    schedules: Schedule[];
}
