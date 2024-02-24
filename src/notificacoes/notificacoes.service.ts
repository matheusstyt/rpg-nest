import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificacaoParceriaEntity } from './notificacoes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacoesService {
    constructor (
        @InjectRepository(NotificacaoParceriaEntity)
    private readonly notificacaoRepository: Repository<NotificacaoParceriaEntity>
    ) {}

    async save(notificao: NotificacaoParceriaEntity){
        await this.notificacaoRepository.save(notificao);
    }
    async findAll(id: string){
        return await this.notificacaoRepository.find({
            where: {
                recipient: { id }
            }
        })
    }

}
