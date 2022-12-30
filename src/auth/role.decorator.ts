import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const Role = (role: string) => SetMetadata(ROLE_KEY, role);
export const RoleAtLeastCommon = Role("common");
export const RoleAtLeastLeader = Role("leader");
export const RoleAtLeastAdmin = Role("admin");
