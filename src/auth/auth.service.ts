import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuarios/usuarios.service";

@Injectable()
export class AuthService {
    constructor (
        private usuarioServices: UsuarioService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, password: string): Promise<any> {

        const usuario = await this.usuarioServices.findUsername(username);

        if(!usuario || usuario.password !== password){
            throw new ForbiddenException({
                message: "Usuário ou senha inválidos."
            });
        }

        const data = {
            id: usuario.id,
            username: usuario.username,
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email,
        }
        return {
            data,
            access_token: await this.jwtService.signAsync(data)
        }
    }
}