import { Body, Controller, Delete, HttpCode, Param, Post, Put } from "@nestjs/common";
import { RoleAtLeastAdmin } from "src/auth/role.decorator";
import { Department } from "../Department/entities/Department.entity";
import { AbstractController } from "../shared/abstract.controller";
import { DepartmentService } from "./department.service";
import { DepartmentRequestDto, DepartmentResponseDto } from "./dto/department.dto";


@Controller('department')
export class DepartmentController extends AbstractController<Department, DepartmentRequestDto, DepartmentResponseDto> {
  constructor(service: DepartmentService) {
    super(service);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: DepartmentRequestDto): Promise<DepartmentResponseDto> {
    return await super.create(dto);
  }

  @Put(":id")
  @RoleAtLeastAdmin
  async update(@Param("id") id: number, @Body() dto: DepartmentRequestDto)
    : Promise<DepartmentResponseDto> {
    return await super.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  @RoleAtLeastAdmin
  async delete(@Param("id") id: number): Promise<void> {
    await super.delete(id);
  }
}
