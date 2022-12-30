import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private readonly reflector: Reflector) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRole = this.reflector.get<string>('role', context.getHandler());
        if (!requiredRole) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
        const [email, passwordHash] = Buffer.from(b64auth, 'base64').toString().split(':');
        const user = await this.userRepository.findOne({
            where: {
                email: email,
                passwordHash: passwordHash,
                isDeleted: false
            }
        });
        if (user == undefined) {
            throw new UnauthorizedException();
        }
        return this.validateRole(user, requiredRole);
    }

    private validateRole(user, requiredRole): boolean {
        return (requiredRole == "admin" && user.role.key == "admin")
            || (requiredRole == "leader" && (user.role.key == "admin" || user.role.key == "leader"))
            || (requiredRole == "common" && (user.role.key == "admin" || user.role.key == "leader" || user.role.key == "common"))
    }
}