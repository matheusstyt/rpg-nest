import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalasEntity } from './salas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalasService {
    constructor ( 
        @InjectRepository(SalasEntity)
        private readonly salaRepository: Repository<SalasEntity>
    ) {}
    async save(usuario: SalasEntity) {
        await this.salaRepository.save(usuario);
    }
    async findOne(id: string) {
        return await this.salaRepository.findOne({
            where: {id},
            relations: ['participantes']
        });
    }
    async listCreatedRooms(id: string) {
        const usuarios = await this.salaRepository.find({
            where: {
                criador: { id }
            }
        });
        return usuarios;
    }
    async update(id: string, data: SalasEntity) {
        return await this.salaRepository.update(id, data);
    }
    async delete(id: string) {
        return await this.salaRepository.delete(id);
    }
}
