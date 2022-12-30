import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto, UserResponseDto } from './dto/user.dto';
import { AbstractController } from '../shared/abstract.controller';
import { User } from './entities/user.entity';
import { RoleAtLeastAdmin, RoleAtLeastCommon, RoleAtLeastLeader } from 'src/auth/role.decorator';
import { ChangePasswordDto } from './dto/change.password.dto';

@Controller('user')
export class UserController extends AbstractController<User, UserRequestDto, UserResponseDto> {
  constructor(userService: UserService) {
    super(userService);
  }

  @Get("/login/:email/:passwordHash")
  async login(@Param("email") email: string, @Param("passwordHash") passwordHash: string) : Promise<UserResponseDto> {
    const found = (await super.all()).filter(u => u.email == email && u.passwordHash == passwordHash);
    if (found.length == 1) {
      const user = await this.service.getRepository().findOne({
        where: {
            email: email,
            passwordHash: passwordHash,
            isDeleted: false
        }
    });
      return user;
    }
    throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }

  @Get()
  @RoleAtLeastCommon
  async all(): Promise<UserResponseDto[]> {
    return await super.all();
  }

  @Get(":id")
  @RoleAtLeastLeader
  async one(@Param("id") id: number): Promise<UserResponseDto> {
    return await super.one(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    return await super.create(dto);
  }

  @Put(":id")
  @RoleAtLeastAdmin
  async update(@Param("id") id: number, @Body() dto: UserRequestDto)
    : Promise<UserResponseDto> {
    return await super.update(id, dto);
  }

  @Put(":id/changePassword")
  @RoleAtLeastCommon
  async changePassword(@Param("id") id: number, @Body() dto: ChangePasswordDto): Promise<UserRequestDto> {
    return await (this.service as UserService).changePassword(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  @RoleAtLeastAdmin
  async delete(@Param("id") id: number): Promise<void> {
    await super.delete(id);
  }
}
