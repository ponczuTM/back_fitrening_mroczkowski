import { Activity } from "../../activity/entities/activity.entity";
import { Department } from "../../department/entities/department.entity";
import { Role } from "../../role/entities/role.entity";
import { Schedule } from "../../schedule/entities/schedule.entity";
import { Sex } from "../../sex/entities/sex.entity";
import { AbstractEntity } from "../../shared/abstract.entity";
import { Target } from "../../target/entities/target.entity";
import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";

@Entity()
export class User extends AbstractEntity {
    @Column({ unique: true })
    email: string;
    @Column()
    passwordHash: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;

    @ManyToOne(type => Department, department => department.users, {
        eager: true,
        lazy: false
    })
    department: Department;

    @ManyToOne(type => Role, role => role.users, {
        lazy: false,
        eager: true
    })
    role: Role;

    @ManyToOne(type => Sex, sex => sex.users, {
        lazy: false,
        eager: true
    })
    sex: Sex;

    @OneToMany(type => Schedule, schedule => schedule.leaderUser)
    leaderUserSchedules: Schedule[];

    @OneToMany(type => Activity, activity => activity.user)
    activities: Activity[];
}
