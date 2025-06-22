import { Roles } from 'src/auth/role/roles.enum';
export declare class CreateUserDto {
    login: string;
    email: string;
    password: string;
    role: Roles;
    constructor();
}
