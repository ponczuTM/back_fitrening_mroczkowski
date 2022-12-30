import { Body, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { Role, RoleAtLeastCommon, RoleAtLeastLeader } from "../auth/role.decorator";
import { AbstractService } from "./abstract.service";

export abstract class AbstractController<TEntity, TRequestDto, TResponseDto> {
    constructor(protected service: AbstractService<TEntity, TRequestDto, TResponseDto>) {
    }

    @Get()
    @RoleAtLeastCommon
    async all(): Promise<TResponseDto[]> {
        return await this.service.all();
    }

    @Get(":id")
    @RoleAtLeastCommon
    async one(@Param("id") id: number): Promise<TResponseDto> {
        return await this.service.one(id);
    }

    @Post()
    @HttpCode(201)
    @RoleAtLeastLeader
    async create(@Body() dto: TRequestDto): Promise<TResponseDto> {
        const mapped = await this.service.create(dto);
        return mapped;
    }

    @Put(":id")
    @RoleAtLeastLeader
    async update(@Param("id") id: number, @Body() dto: TRequestDto)
        : Promise<TResponseDto> {
        return await this.service.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    @RoleAtLeastLeader
    async delete(@Param("id") id: number): Promise<void> {
        await this.service.delete(id);
    }
}
