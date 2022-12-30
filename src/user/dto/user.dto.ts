import { DepartmentRequestDto, DepartmentResponseDto } from "src/department/dto/department.dto";

export class UserRequestDto {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    department: DepartmentRequestDto;
}
export class UserResponseDto {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    department: DepartmentResponseDto;
}