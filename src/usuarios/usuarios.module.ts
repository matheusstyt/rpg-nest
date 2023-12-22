import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuarios.entity";
import { UsuarioController } from "./usuarios.controller";
import { UsuarioService } from "./usuarios.service";

@Module(
    {
        imports: [ TypeOrmModule.forFeature([UsuarioEntity]) ],
        controllers: [UsuarioController],
        providers: [ UsuarioService]
    }
)
export class UsuarioModule {}