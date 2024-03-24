import { UsuarioEntity } from "src/usuarios/usuarios.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "salas"})
export class SalasEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({name: "is_aberto", default: false, type: "boolean"})
    is_aberto?: boolean;

    @Column({name: "tempo_ativo", default: 0})
    tempo_ativo?: number;

    @Column({name: "titulo", nullable: false, length: 255})
    titulo?: string;

    @Column({name: "lore", nullable: true, type: "text"})
    lore?: string;

    @CreateDateColumn({name: "created_at"})
    created_at?: string;

    @ManyToOne(() => UsuarioEntity, criador => criador.created_rooms)
    criador?: UsuarioEntity;

    @OneToMany(() => UsuarioEntity, usuario => usuario.salas,)
    participantes?: UsuarioEntity[];
}
    
    // @ManyToMany(() => UsuarioEntity)
    // @JoinTable({
    //     name: "participantes",
    //     joinColumn: {
    //         name: "usuario_id",
    //         referencedColumnName: 'id',
    //     },
    //     inverseJoinColumn: {
    //         name: "parceiro_id",
    //         referencedColumnName: 'id',
    //     },
    // })
    // participantes?: UsuarioEntity[];