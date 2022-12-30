import { AbstractEntity } from "../../shared/abstract.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Role extends AbstractEntity {
    @Column()
    name: string;
    @Column()
    key: string;
    @OneToMany(type => User, user => user.role)
    users: User[];
}
