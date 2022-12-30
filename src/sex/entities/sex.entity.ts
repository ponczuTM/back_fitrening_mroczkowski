import { AbstractEntity } from "../../shared/abstract.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Sex extends AbstractEntity {
    @Column()
    name: string;
    @OneToMany(type => User, user => user.sex)
    users: User[];
}
