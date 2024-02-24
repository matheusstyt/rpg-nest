import { Body, Controller, ForbiddenException, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ConviteParceriaService } from './conviteParceria.service';
import { Public } from 'src/auth/constants';
import { ConviteParceriaDTO } from './conviteParceria.dto';
import { ConviteParceriaEntity } from './conviteParceria.entity';
import { v4 as uuid } from "uuid";
import { UsuarioEntity } from 'src/usuarios/usuarios.entity';
import { UsuarioService } from 'src/usuarios/usuarios.service';

@Controller("conviteParceria")
export class ConviteParceriaController {
    constructor ( 
        private conviteParceriaService: ConviteParceriaService,
        private usuarioService: UsuarioService,
        ) { }

    @Public()
    @Get(":id")
    async getListSolititacoes (
        @Param("id") id: string
    ){
        console.log(id)
        const list = await this.conviteParceriaService.findAll(id);
        return { list }
    }
    @Public()
    @Post("aceitar")
    async aceitarConvite( @Body() body: any){
        const conviteExistente = await this.conviteParceriaService.findOne(body.id_convite);
        
        const usuarioSenderExistente = await this.usuarioService.findOne(conviteExistente.sender.id);
        const usuarioRecipientExistente = await this.usuarioService.findOne(conviteExistente.recipient.id);

        const isExists = usuarioRecipientExistente.parcerias.find((parceiro) => parceiro.id === conviteExistente.sender.id);
        
        if(isExists) {
            await this.conviteParceriaService.deleted(conviteExistente.id);
            throw new ForbiddenException("Já existe na lista de parceiros");
        }
        
        usuarioSenderExistente.parcerias.push(usuarioRecipientExistente);
        usuarioRecipientExistente.parcerias.push(usuarioSenderExistente);

        await this.usuarioService.save(usuarioSenderExistente);
        await this.usuarioService.save(usuarioRecipientExistente);

        await this.conviteParceriaService.deleted(conviteExistente.id);
    }
    @Public()
    @Post()
    async novaNotificacao( @Body() body: ConviteParceriaDTO) {
        console.log(body);

        if( body.sender_fk  === body.recipient_fk){
            throw new ForbiddenException("Não pode enviar convite pra sí mesmo!")
        }
        await this.conviteParceriaService.verificaConvite(body.sender_fk, body.recipient_fk);
        
        const sender = new UsuarioEntity();
        sender.id = body.sender_fk;

        const recipient = new UsuarioEntity();
        recipient.id = body.recipient_fk;

        try {
            const novoConvite = new ConviteParceriaEntity();
            novoConvite.id = uuid();
            novoConvite.sender = sender;
            novoConvite.recipient = recipient;
            
            await this.conviteParceriaService.save(novoConvite);

            return { status: HttpStatus.OK}

        } catch (error) {
            return { status: HttpStatus.BAD_REQUEST}
        }
    }

    @Put(":id")
    @Public()
    async atualizarStatus (
        @Param("id") id : string,
        @Body() body : any
    ) {
        await this.conviteParceriaService.updated(id, {is_opened : true});
    }
}
