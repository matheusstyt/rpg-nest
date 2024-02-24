import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConviteSalaEntity } from './conviteSala.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConviteSalaService {
    constructor (
        @InjectRepository(ConviteSalaEntity)
    private readonly conviteSalaRepository: Repository<ConviteSalaEntity>
    ) {}

    async save(notificao: ConviteSalaEntity){
        await this.conviteSalaRepository.save(notificao);
    }
    async findAll(id: string){
        return await this.conviteSalaRepository.find({
            where: {
                recipient: { id }
            }
        })
    }

}
