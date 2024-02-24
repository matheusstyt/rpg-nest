import { Module } from '@nestjs/common';
import { ConviteParceriaService } from './conviteParceria.service';
import { ConviteParceriaController } from './conviteParceria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConviteParceriaEntity } from './conviteParceria.entity';
import { UsuarioService } from 'src/usuarios/usuarios.service';
import { UsuarioEntity } from 'src/usuarios/usuarios.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ConviteParceriaEntity, UsuarioEntity]) ],
    controllers: [ ConviteParceriaController],
    providers: [ ConviteParceriaService, UsuarioService ],
})
export class ConviteParceriaModule {}
