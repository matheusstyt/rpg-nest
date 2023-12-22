import { Repository } from "typeorm";
import { UsuarioEntity } from "./usuarios.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUsuarioDTO } from "./usuarios.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioService {
    constructor (
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async save(usuario: UsuarioEntity) {
        await this.usuarioRepository.save(usuario);
    }
    async findOne(id: string) {
        return await this.usuarioRepository.findOne({where: {id}});
    }
    async findUsername(username: string): Promise<UsuarioEntity | undefined>{
        return await this.usuarioRepository.findOne({where: {username}});
    }
    async findInfo(id: string) {
        return await this.usuarioRepository.findOne(
            {
                where: {id},
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    username: true
                }
            }
        );
    }
    async list() {
        const usuarios = await this.usuarioRepository.find({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true
            }
        });
        return usuarios;
    }
    async update(id: string, data: UpdateUsuarioDTO) {
        return await this.usuarioRepository.update(id, data);
    }
    async delete(id: string) {
        return await this.usuarioRepository.delete(id);
    }
}