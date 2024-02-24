import { SalasEntity } from "src/salas/salas.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "usuarios"})
export class UsuarioEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({name: "first_name", length: 255, nullable: false})
    first_name?: string;

    @Column({name: "last_name", length: 255, nullable: false})
    last_name?: string;

    @Column({name: "email", length: 255, nullable: false})
    email?: string;

    @Column({name: "username", length: 255, nullable: false})
    username?: string;

    @Column({name: "password", length: 255, nullable: false})
    password?: string;

    @CreateDateColumn({name: "created_at"})
    created_at?: string;

    // lista de parceiros
    @ManyToMany(() => UsuarioEntity)
    @JoinTable({
        name: "parcerias",
        joinColumn: {
            name: "usuario_id",
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: "parceiro_id",
            referencedColumnName: 'id',
        },
    })
    parcerias?: UsuarioEntity[];
    // sala na qual participam
    @ManyToOne(() => SalasEntity, sala => sala.participantes,  { eager: true})
    salas?: SalasEntity;
    // salas criadas por ele
    @OneToMany(() => SalasEntity, sala => sala.criador, { eager: true})
    created_rooms?: SalasEntity[];
}