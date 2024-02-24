/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasEntity } from './salas.entity';
import { SalasController } from './salas.controller';
import { SalasService } from './salas.service';
import { SalasGateway } from './salas.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([SalasEntity])],
    controllers: [SalasController],
    providers: [SalasService, SalasGateway],
})
export class SalasModule {}
