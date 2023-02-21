import { Activity } from "../activity/entities/activity.entity";
import { Repository } from "typeorm";
import { Department } from "src/department/entities/department.entity";
import { Role } from "src/role/entities/role.entity";
import { Schedule } from "src/schedule/entities/schedule.entity";
import { Sex } from "src/sex/entities/sex.entity";
import { Target } from "src/target/entities/target.entity";
import { User } from "src/user/entities/user.entity";
import { ScheduleItem, ScheduleItemKind } from "src/schedule_item/entities/schedule-item.entity";

export class DbInitializer {
    constructor(
        private activityRepository: Repository<Activity>,
        private departmentRepository: Repository<Department>,
        private roleRepository: Repository<Role>,
        private scheduleRepository: Repository<Schedule>,
        private sexRepository: Repository<Sex>,
        private targetRepository: Repository<Target>,
        private userRepository: Repository<User>,
        private scheduleItemRepository: Repository<ScheduleItem>
    )
    {
    }

    async initialize() : Promise<void> {
        await this.departmentRepository.save({
            name: "Urząd Marszałkowski Toruń",
            location: "ul. Piernikowa 12/9",
            managerFirstName: "Józef",
            managerLastName: "Talar",
            managerEmail: "jtalar@gmail.com" 
        });
        await this.roleRepository.save([
            {
                key: "admin",
                name: "Administrator"
            },
            {
                key: "leader",
                name: "Prowadzący"
            },
            {
                key: "common",
                name: "Zwykły"
            }
        ]);
        await this.sexRepository.save([
            {
                name: "Mężczyzna"
            },
            {
                name: "Kobieta"
            },
            {
                name: "Inna"
            }
        ]);
        await this.userRepository.save([
            {
                email: "jkowalski@gmail.com",
                passwordHash: "e8edfe7797be6a4290f7f4f2c7d44fbb",
                firstName: "Jan",
                lastName: "Kowalski",
                department: {id: 1},
                sex: { id: 1 },
                role: { id: 1 }
            },
            {
                email: "anowak@gmail.com",
                passwordHash: "fa859d0f19092a376c5d998ef7d99d53",
                firstName: "Anna",
                lastName: "Nowak",
                department: {id: 1},
                sex: { id: 2 },
                role: { id: 2 }
            },
            {
                email: "amalysz@gmail.com",
                passwordHash: "025418511100cedf9e89076e234c3daf",
                firstName: "Adam",
                lastName: "Małysz",
                department: {id: 1},
                sex: { id: 1 },
                role: { id: 2 }
            },
            {
                email: "alewandowska@gmail.com",
                passwordHash: "aeac6ce1f3e2581f0d34f00a0c3ba413",
                firstName: "Anna",
                lastName: "Lewandowska",
                department: {id: 1},
                sex: { id: 2 },
                role: { id: 2 }
            },
            {
                email: "jklawiter@gmail.com",
                passwordHash: "7833ee90ec1e9dc6b7c7ea381fbdc3a5",
                firstName: "Jakub",
                lastName: "Klawiter",
                department: {id: 1},
                sex: { id: 1 },
                role: { id: 2 }
            },
            {
                email: "jtona@gmail.com",
                passwordHash: "b01a93599116d2272d1e4fe146d9cacf",
                firstName: "Jan",
                lastName: "Tona",
                department: {id: 1},
                sex: { id: 1 },
                role: { id: 3 }
            },
            {
                email: "kslimak@gmail.com",
                passwordHash: "192f8796b4433d886df406956183cd23",
                firstName: "Kamil",
                lastName: "Ślimak",
                department: {id: 1},
                sex: { id: 1 },
                role: { id: 3 }
            },
            {
                email: "sul@gmail.com",
                passwordHash: "6eef2965e5ad5f10a79ea6dcc2a291e9",
                firstName: "Sylwia",
                lastName: "Ul",
                department: {id: 1},
                sex: { id: 2 },
                role: { id: 3 }
            },
            {
                email: "edom@gmail.com",
                passwordHash: "217303e52413d95657c2ef519d5791db",
                firstName: "Ela",
                lastName: "Dom",
                department: {id: 1},
                sex: { id: 2 },
                role: { id: 3 }
            },
            {
                email: "opor@gmail.com",
                passwordHash: "a21ab22a6dd460d4b98189ee6564da11",
                firstName: "Ola",
                lastName: "Por",
                department: {id: 1},
                sex: { id: 2 },
                role: { id: 3 }
            },
            {
                email: "omroczkowski@gmail.com",
                passwordHash: "b648e20ef6f1015af3c3abab6f01ad1f",
                firstName: "Oliwer",
                lastName: "Mroczkowski",
                department: {id: 1},
                sex: { id: 1 },
                role: { id: 3 }
            },
            {
                email: "ztalar@gmail.com",
                passwordHash: "b9c6dfc94b35bf4f4168c2567142bf44",
                firstName: "Zygmunt",
                lastName: "Talar",
                department: {id: 1},
                sex: { id: 1 },
                role: { id: 3 }
            },
            {
                email: "aaktywny@gmail.com",
                passwordHash: "c532e68bb26428f565ec9e9ca4f08157",
                firstName: "Adam",
                lastName: "Aktywny",
                department: {id: 1},
                sex: { id: 1 },
                role: { id: 3 }
            },
            {
                email: "jpraca@gmail.com",
                passwordHash: "13ec11fa7d2e106082f020e8c817ed0d",
                firstName: "Joanna",
                lastName: "Praca",
                department: {id: 1},
                sex: { id: 2 },
                role: { id: 2 }
            },
        ]);
        await this.targetRepository.save([
            {
                name: "Basen Hallera",
                location: "ul. Generała Józefa Hallera 79, 87-100 Toruń",
                department: { id: 1}
            },
            {
                name: "Basen Bażyńskich",
                location: "ul. Bażynskich 9, 87-100 Toruń",
                department: { id: 1}
            },
            {
                name: "Bella Line Wellness Centrum",
                location: "ul. Stanisława Żółkiewskiego 8, 87-100 Toruń",
                department: { id: 1}
            },
            {
                name: "CrossFox Polna",
                location: "ul. Polna 134-136/Hala nr 7, 87-100 Toruń",
                department: { id: 1}
            },
            {
                name: "Szkoła Walki Golden Dragon",
                location: "ul. Marii Skłodowskiej Curie 16, 85-094 Bydgoszcz",
                department: { id: 1}
            },
            {
                name: "Całodobowy obiekt sportowy",
                location: "ul. Nielimitowana 1, 87-100 Toruń",
                department: { id: 1}
            }
        ]);
        await this.scheduleRepository.save({
            target: { id: 1 },
            leaderUser: { id: 2 }
        });
        await this.scheduleItemRepository.save([
            {
                from: "2022-11-04T08:00Z",
                to: "2022-11-04T10:00Z",
                kind: ScheduleItemKind.Cyclic,
                schedule: { id: 1 }
            },
            {
                from: "2022-11-12T08:00Z",
                to: "2022-11-12T10:00Z",
                kind: ScheduleItemKind.SinglePresence,
                schedule: { id: 1 }
            },
            {
                from: "2022-11-18T08:00Z",
                to: "2022-11-18T10:00Z",
                kind: ScheduleItemKind.SingleAbsence,
                schedule: { id: 1 }
            },
        ]);
        await this.scheduleRepository.save({
            target: { id: 2 },
            leaderUser: { id: 3 }
        });
        await this.scheduleItemRepository.save([
            {
                from: "2022-11-07T08:30Z",
                to: "2022-11-07T09:30Z",
                kind: ScheduleItemKind.Cyclic,
                schedule: { id: 2 }
            }
        ]);
        await this.scheduleRepository.save({
            target: { id: 3 },
            leaderUser: { id: 4 }
        });
        await this.scheduleItemRepository.save([
            {
                from: "2022-11-02T16:00Z",
                to: "2022-11-02T18:00Z",
                kind: ScheduleItemKind.Cyclic,
                schedule: { id: 3 }
            },
            {
                from: "2022-12-28T16:00Z",
                to: "2022-12-28T18:00Z",
                kind: ScheduleItemKind.SingleAbsence,
                schedule: { id: 3 }
            },
        ]);

        await this.scheduleRepository.save({
            target: { id: 4 },
            leaderUser: { id: 5 }
        });
        await this.scheduleItemRepository.save([
            {
                from: "2022-11-03T16:00Z",
                to: "2022-11-03T18:00Z",
                kind: ScheduleItemKind.Cyclic,
                schedule: { id: 4 }
            }
        ]);
        await this.scheduleRepository.save({
            target: { id: 1 },
            leaderUser: { id: 3 }
        });
        await this.scheduleItemRepository.save([
            {
                from: "2022-11-07T15:00Z",
                to: "2022-11-07T16:30Z",
                kind: ScheduleItemKind.Cyclic,
                schedule: { id: 5 }
            }
        ]);
        await this.scheduleRepository.save({
            target: { id: 6 },
            leaderUser: { id: 14 }
        });
        await this.scheduleItemRepository.save([
            {
                from: "2022-12-01T10:00Z",
                to: "2022-12-01T11:00Z",
                kind: ScheduleItemKind.Cyclic,
                schedule: { id: 6 }
            },
        ]);
        await this.activityRepository.save([
            {
                moment: "2022-11-25",
                user: { id: 6 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-02",
                user: { id: 6 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-09",
                user: { id: 6 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-16",
                user: { id: 6 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-11-7",
                user: { id: 6 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-11-28",
                user: { id: 6 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-12-12",
                user: { id: 6 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-11-25",
                user: { id: 7 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-02",
                user: { id: 7 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-09",
                user: { id: 7 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-16",
                user: { id: 7 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-11-7",
                user: { id: 7 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-11-28",
                user: { id: 7 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-12-12",
                user: { id: 7 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-11-16",
                user: { id: 7 },
                schedule: { id: 3 }
            },
            {
                moment: "2022-11-30",
                user: { id: 7 },
                schedule: { id: 3 }
            },
            {
                moment: "2022-11-25",
                user: { id: 11 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-02",
                user: { id: 11 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-09",
                user: { id: 11 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-16",
                user: { id: 11 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-11-7",
                user: { id: 11 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-11-28",
                user: { id: 11 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-12-12",
                user: { id: 11 },
                schedule: { id: 2 }
            },
            {
                moment: "2022-11-16",
                user: { id: 11 },
                schedule: { id: 3 }
            },
            {
                moment: "2022-11-30",
                user: { id: 11 },
                schedule: { id: 3 }
            },
            {
                moment: "2022-11-03",
                user: { id: 11 },
                schedule: { id: 4 } 
            },
            {
                moment: "2022-11-10",
                user: { id: 11 },
                schedule: { id: 4 }
            },
            {
                moment: "2022-11-17",
                user: { id: 11 },
                schedule: { id: 4 }
            },
            {
                moment: "2022-11-24",
                user: { id: 11 },
                schedule: { id: 4 }
            },
            {
                moment: "2022-12-01",
                user: { id: 11 },
                schedule: { id: 4 }
            },
            {
                moment: "2022-12-08",
                user: { id: 11 },
                schedule: { id: 4 }
            },
            {
                moment: "2022-11-25",
                user: { id: 12 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-02",
                user: { id: 12 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-09",
                user: { id: 12 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-16",
                user: { id: 12 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-11-25",
                user: { id: 12 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-02",
                user: { id: 12 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-09",
                user: { id: 12 },
                schedule: { id: 1 }
            },
            {
                moment: "2022-12-16",
                user: { id: 12 },
                schedule: { id: 1 }
            }
        ]);
    }
}