import { 
    IsNotEmpty, 
    IsOptional, 
    IsString
 } from "class-validator";
import { UsuarioEntity } from "src/usuarios/usuarios.entity";

export class SalaDTO {

    @IsNotEmpty({ message: "'titulo' não pode ser vazio!" })
    @IsString({ message: "'titulo' ser string." })
    titulo: string;

    @IsNotEmpty({ message: "'lore' não pode ser vazio!" })
    @IsString({ message: "'lore' nome ser string." })
    lore?: string;

    @IsNotEmpty()
    criador: UsuarioEntity;
}

export class UpdateSalaDTO {

    @IsOptional()
    @IsString({ message: "'titulo' ser string." })
    titulo: string;

    @IsOptional()
    @IsString({ message: "'lore' nome ser string." })
    lore?: string;

}
