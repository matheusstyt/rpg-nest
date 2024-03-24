/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasEntity } from './salas.entity';
import { SalasController } from './salas.controller';
import { SalasService } from './salas.service';
import { SalasGateway } from './salas.gateway';
import { UsuarioService } from 'src/usuarios/usuarios.service';
import { UsuarioEntity } from 'src/usuarios/usuarios.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SalasEntity, UsuarioEntity])],
    controllers: [SalasController],
    providers: [SalasService, UsuarioService, SalasGateway],
})
export class SalasModule {}
