import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { Public } from 'src/auth/constants';
import { ConviteDTO } from './notificacoes.dto';
import { NotificacaoParceriaEntity } from './notificacoes.entity';
import { v4 as uuid } from "uuid";

@Controller("notificacoes")
export class NotificacoesController {
    constructor ( private notificaoService: NotificacoesService ) { }

    @Public()
    @Get(":id")
    async getListSolititacoes (
        @Param("id") id: string
    ){
        const list = await this.notificaoService.findAll(id);
        return { list }
    }

    @Public()
    @Post()
    async novaNotificacao( @Body() body: ConviteDTO) {
        console.log(body);

        try {
            const novoConvite = new NotificacaoParceriaEntity();
            novoConvite.id = uuid();
            novoConvite.sender = { id : body.sender_fk};
            novoConvite.recipient = { id : body.recipient_fk};
            
            await this.notificaoService.save(novoConvite);

            return { status: HttpStatus.OK}

        } catch (error) {
            return { status: HttpStatus.BAD_REQUEST}
        }
    }
}
