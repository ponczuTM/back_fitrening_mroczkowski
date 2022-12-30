import { HttpException, HttpStatus } from "@nestjs/common";
import { ChangePasswordDto } from "src/user/dto/change.password.dto";
import { Repository } from "typeorm";

export abstract class AbstractService<TEntity, TRequestDto, TResponseDto> {
    constructor (
        protected repository: Repository<TEntity>,
        protected of: (entity: TEntity) => Promise<TResponseDto>) {
    }

    getRepository() : Repository<TEntity> {
        return this.repository;
    }

    async all(): Promise<TResponseDto[]> {
        const entities: TEntity[] = await this.repository.find({
            where: {
                isDeleted: false
            }
        });
        return Promise.all(entities.map(e => this.of(e)));
    }

    async one(id: number): Promise<TResponseDto> {
        const entity = await (this.repository as any).findOne({
            where: {
                id: id,
                isDeleted: false
            }
        });
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return this.of(entity);
    }

    async create(dto: TRequestDto): Promise<TResponseDto> {
        const entity: TEntity = await this.repository.save((this.repository as any).create(dto));
        return this.of(entity);
    }

    async update(id: number, dto: TRequestDto): Promise<TResponseDto> {
        let entity = await (this.repository as any).findOne({
            where: {
                id: id,
                isDeleted: false
            }
        });
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        Object.assign(entity, dto);
        return this.of(await this.repository.save(entity));
    }

    async delete(id: number) : Promise<void> {
        const entity = await (this.repository as any).findOne({
            where: {
                id: id,
                isDeleted: false
            }
        });
        if (entity == null) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        entity.isDeleted = true;
        await this.repository.save(entity);
    }
}
