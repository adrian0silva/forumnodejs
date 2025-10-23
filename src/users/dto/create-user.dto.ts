import { IsEnum, IsEmail, IsString } from 'class-validator';
import { Roles } from 'src/auth/role/roles.enum';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(Roles) // Certifique-se de que isso esteja correto
    role: Roles;

    constructor() {
        this.role = Roles.USER; // Definindo o valor padrão
    }
}
