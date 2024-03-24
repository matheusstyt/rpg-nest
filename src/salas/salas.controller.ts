import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { SalasService } from './salas.service';
import { UsuarioService } from 'src/usuarios/usuarios.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/constants';
import { SalaDTO, UpdateSalaDTO } from './salas.dto';
import { v4 as uuid } from "uuid";
import { SalasEntity } from './salas.entity';

@Controller("salas")
export class SalasController {
    constructor ( 
        private salaService: SalasService,
        private usuarioService: UsuarioService
    ) {}

    @ApiTags("Sala")
    @Public()
    @Get(":id")
    async getSala(@Param("id") id: string){
        const salaEncontrada = await this.salaService.findOne(id);

        if(!salaEncontrada) throw new NotFoundException("Usuário não encontrado.");
        
        return {data: salaEncontrada};
    }

    @ApiTags("Sala")
    @Public()
    @Post()
    async createsala(@Body() data: SalaDTO){
        console.log(data)
        
        const novaSala = new SalasEntity();
            novaSala.id = uuid();
            novaSala.titulo = data.titulo;
            novaSala.lore = data.lore;
            novaSala.is_aberto = true;
            novaSala.criador = data.criador;
        await this.salaService.save(novaSala);

        return { status: "Cadastrado com sucesso!", SalasEntity }
    }

    @ApiTags("Sala")
    @Public()
    @Put(":id")
    async atualizarSala (
        @Param("id") id : string,
        @Body() body : UpdateSalaDTO
    ) {
        try {
            await this.salaService.update(id, body);
            return { status : HttpStatus.OK}
        } catch (error) {
            return { status : HttpStatus.BAD_GATEWAY, error}
        }
    }

    @ApiTags("Sala")
    @Public()
    @Put(":id")
    async DeletarSala (
        @Param("id") id : string ) {
            try {
                await this.salaService.delete(id);
                return { status : HttpStatus.OK}
            } catch (error) {
                return { status : HttpStatus.BAD_GATEWAY, error}
            }
    }
}
