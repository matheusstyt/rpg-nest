import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuarios.entity";
import { UsuarioController } from "./usuarios.controller";
import { UsuarioService } from "./usuarios.service";
import { UsuariosGateway } from "./usuarios.gateway";

@Module(
    {
        imports: [ TypeOrmModule.forFeature([UsuarioEntity]) ],
        controllers: [UsuarioController],
        providers: [ UsuarioService, UsuariosGateway]
    }
)
export class UsuarioModule {}