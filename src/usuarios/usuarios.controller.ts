import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { UsuarioDTO, UsuarioGetOneDTO } from "./usuarios.dto";
import { UsuarioEntity } from "./usuarios.entity";
import { UsuarioService } from "./usuarios.service";
import { v4 as uuid } from "uuid";
import { Public } from "src/auth/constants";

@Controller("/usuarios")
export class UsuarioController {
    constructor ( private usuarioServices: UsuarioService ) {}

    @Public()
    @Post("/registrar")
    async createUsuario(@Body() data: UsuarioDTO){
        console.log(data)
        const usuarioExistente = await this.usuarioServices.findUsername(data.username);
        if(usuarioExistente) throw new ForbiddenException("Nome de usuário já existe!");
        
        const novoUsuario = new UsuarioEntity();
            novoUsuario.id = uuid();
            novoUsuario.first_name = data.first_name;
            novoUsuario.last_name = data.last_name;
            novoUsuario.email = data.email;
            novoUsuario.username = data.username;
            novoUsuario.password = data.password;
        await this.usuarioServices.save(novoUsuario);

        return { status: "Cadastrado com sucesso!", data }
    }
    
    @Get(":id")
    async getUsuario(@Param("id") id: string){
        const usuarioEncontrado = await this.usuarioServices.findInfo(id);

        if(!usuarioEncontrado) throw new NotFoundException("Usuário não encontrado.");
        
        return {data: usuarioEncontrado};
    }
    @Get()
    async getListUsuario(@Param("id") id: string){
        const list = await this.usuarioServices.list();

        return {list};
    }

}