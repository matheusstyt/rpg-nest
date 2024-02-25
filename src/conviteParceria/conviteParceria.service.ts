import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConviteParceriaEntity } from './conviteParceria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConviteParceriaService {
    constructor (
        @InjectRepository(ConviteParceriaEntity)
    private readonly notificacaoRepository: Repository<ConviteParceriaEntity>
    ) {}

    async save(notificao: ConviteParceriaEntity){
        await this.notificacaoRepository.save(notificao);
    }
    // async findAll(id: string){
    //     return await this.notificacaoRepository.find({
    //         relations: ['recipient', 'sender'], // Especifique as relações que deseja incluir
    //         select: {
    //             id: true,
    //             is_opened: true,
    //             created_at: true,
    //             recipient: {
    //                 id: true,
    //                 first_name: true,
    //                 last_name: true,
    //             },
    //             sender: {
    //                 id: true,
    //                 first_name: true,
    //                 last_name: true,
    //             },
    //         },
    //         where: {
    //             recipient: { id }
    //         },
            
    //     })
    // }
    async verificaConvite (fk_sender: string, fk_recipient : string){
        console.log("chegou aqui ", fk_sender)
        const isExists = await this.notificacaoRepository
            .createQueryBuilder('notificacao')
            .leftJoinAndSelect('notificacao.recipient', 'recipient')
            .leftJoinAndSelect('notificacao.sender', 'sender')
            .where('recipient.id = :fk_recipient', { fk_recipient })
            .andWhere('sender.id = :fk_sender', { fk_sender })
            .getMany();
        console.log("isExists", isExists)
        if(isExists.length > 0) throw new ForbiddenException("Convite já existe!")
    }
    async findOne(id:string) {
        return await this.notificacaoRepository.findOne({
            relations: ['recipient', 'sender'], 
          
            where: {
              id 
            },
        })
    }
    async findAll(id: string) {
        return await this.notificacaoRepository
          .createQueryBuilder('notificacao')
          .select([
            'notificacao.id',
            'notificacao.is_opened',
            'notificacao.created_at',
            'recipient.id',
            'recipient.first_name',
            'recipient.last_name',
            'sender.id',
            'sender.first_name',
            'sender.last_name',
          ])
          .leftJoin('notificacao.recipient', 'recipient')
          .leftJoin('notificacao.sender', 'sender')
          .where('recipient.id = :id', { id })
          .getMany();
      }
    async updated(id, body: ConviteParceriaEntity) {
        await this.notificacaoRepository.update(id, body)
    }
    async deleted(id) {
        await this.notificacaoRepository.delete(id);
    }
}
