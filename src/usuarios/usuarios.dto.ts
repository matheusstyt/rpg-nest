import { 
    IsEmail, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    MinLength } from "class-validator";

export class UsuarioDTO {

    @IsNotEmpty({ message: "O primeiro nome não pode ser vazio!" })
    @IsString({ message: "O primeiro nome ser string." })
    first_name: string;

    @IsNotEmpty({ message: "O último nome não pode ser vazio!" })
    @IsString({ message: "O ultimo nome ser string." })
    last_name?: string;

    @IsNotEmpty({ message: "O email não pode ser vazio!" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "O nome de usuário não pode ser vazio!" })
    @IsString({ message: "O nome de usuário deve ser string." })
    username: string;

    @MinLength(8)
    @IsNotEmpty({ message: "A senha não pode ser vazio!" })
    @IsString({ message: "A senha deve ser string." })
    password: string;
}
export class UpdateUsuarioDTO {

    @IsOptional()
    @IsString({ message: "O primeiro nome ser string." })
    first_name?: string;

    @IsOptional()
    @IsString({ message: "O ultimo nome ser string." })
    last_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString({ message: "O nome de usuário deve ser string." })
    username?: string;

    @MinLength(8)
    @IsOptional()
    @IsString({ message: "A senha deve ser string." })
    password?: string;
}

export class UsuarioGetOneDTO {

    first_name?: string;

    last_name?: string;

    email?: string;

    username?: string;

}

export class ListUsusariosDTO {
    constructor (
        readonly id: string,
        readonly first_name: string,
        readonly last_name: string,
        readonly username: string,
    ) {}
}