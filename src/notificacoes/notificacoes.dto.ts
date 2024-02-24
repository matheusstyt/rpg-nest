import { IsNotEmpty, IsString } from "class-validator";

export class ConviteDTO {
    
    @IsNotEmpty({ message: "O fk do sender não pode ser vazio!" })
    @IsString({ message: "O fk do sender deve ser string." })
    sender_fk: string;

    @IsNotEmpty({ message: "O fk do recipient não pode ser vazio!" })
    @IsString({ message: "O fk do recipient deve ser string." })
    recipient_fk: string;
}