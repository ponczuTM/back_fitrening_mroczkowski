import { AbstractEntity } from "../../shared/abstract.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Target } from "src/target/entities/target.entity";

@Entity()
export class Department extends AbstractEntity {
    @Column({unique: true})
    name: string;
    @Column({unique: true})
    location: string;
    @Column()
    managerFirstName: string;
    @Column()
    managerLastName: string;
    @Column()
    managerEmail: string;
    @Column({
        default: 100
    })
    commonUserLimit: number;
    @Column({
        default: 10
    })
    leaderUserLimit: number;
    @OneToMany(type => User, user => user.department)
    users: User[];

    @OneToMany(type => Target, target => target.department)
    targets: Target[];
}
