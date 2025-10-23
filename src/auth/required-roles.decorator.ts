import { SetMetadata } from "@nestjs/common";
import { Roles } from "./role/roles.enum";

export const RequiredRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
