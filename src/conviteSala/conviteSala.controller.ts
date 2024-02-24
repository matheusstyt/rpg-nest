import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ConviteSalaService } from './conviteSala.service';
import { Public } from 'src/auth/constants';
import { ConviteSalaDTO } from './conviteSala.dto';
import { ConviteSalaEntity } from './conviteSala.entity';
import { v4 as uuid } from "uuid";

@Controller("conviteSala")
export class ConviteSalaController {
    constructor ( private notificaoService: ConviteSalaService ) { }

    @Public()
    @Get(":id")
    async getListConvite (
        @Param("id") id: string
    ){
        const list = await this.notificaoService.findAll(id);
        return { list }
    }

    @Public()
    @Post()
    async novoConviteSala( @Body() body: ConviteSalaDTO) {
        console.log(body);

        try {
            const novoConvite = new ConviteSalaEntity();
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
