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
        return await this.usuarioRepository.findOne(
            {
                where: {id},
                relations: ["parcerias", "salas", "salas.criador", "created_rooms"],
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    username: true,
                    is_online: true,
                    parcerias: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        username: true,
                        is_online: true
                    },
                    salas: {
                        id: true,
                        is_aberto: true,
                        tempo_ativo: true,
                        titulo: true,
                        criador: {
                            id: true,
                            first_name: true,
                            username: true,
                        }
                    },
                    created_rooms: true
                }
            });
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
    async update(id: string, data: UsuarioEntity) {
        return await this.usuarioRepository.update(id, data);
    }
    async delete(id: string) {
        return await this.usuarioRepository.delete(id);
    }
}