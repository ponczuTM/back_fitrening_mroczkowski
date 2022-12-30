import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from '../app.module';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { UserRequestDto, UserResponseDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from './dto/change.password.dto';
import { Department } from '../department/entities/department.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService extends AbstractService<User, UserRequestDto, UserResponseDto> {
  constructor(@InjectRepository(User) userRepository: Repository<User>,
    @InjectRepository(Department) private departmentRepository: Repository<Department>,
    @InjectRepository(Role) private roleRepository: Repository<Role>) {
    super(userRepository, async e => await mapper(UserResponseDto, e))
  }

  async changePassword(id: number, dto: ChangePasswordDto): Promise<UserRequestDto> {
    const user = await this.repository.findOne(id);
    if (user == null) {
      throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    }
    if (user.passwordHash != dto.oldPasswordHash) {
      throw new HttpException("Old password is incorrect", HttpStatus.BAD_REQUEST);
    }
    user.passwordHash = dto.newPasswordHash;
    return await this.repository.save(user);
  }

  async create(dto: UserRequestDto): Promise<UserResponseDto> {
    const user = await mapper(User, dto);
    const role = await this.roleRepository.findOne(user.role.id);
    if (role.key == "common" && !this.checkLimit("common", user.department.id)) {
      throw new HttpException("Common user limit reached", HttpStatus.BAD_REQUEST);
    }
    if (role.key == "leader" && !this.checkLimit("leader", user.department.id)) {
      throw new HttpException("Leader user limit reached", HttpStatus.BAD_REQUEST);
    }
    return await super.create(dto);
  }

  private async checkLimit(roleKey: string, departmentId: number): Promise<boolean> {
    const department = await this.departmentRepository.findOne(departmentId);
    const userCount = await this.repository.count(
      {
        where:
        {
          department: { id: departmentId },
          role: { key: roleKey }
        }
      });
    const limits = {
      "common": department.commonUserLimit,
      "leader": department.leaderUserLimit,
    }
    return userCount < limits[roleKey];
  }
}