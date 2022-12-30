import { IsNotEmpty } from "class-validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    oldPasswordHash: string;
    @IsNotEmpty()
    newPasswordHash: string;
}
