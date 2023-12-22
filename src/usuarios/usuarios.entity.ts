import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "usuarios"})
export class UsuarioEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "first_name", length: 255, nullable: false})
    first_name: string;

    @Column({name: "last_name", length: 255, nullable: false})
    last_name: string;

    @Column({name: "email", length: 255, nullable: false})
    email: string;

    @Column({name: "username", length: 255, nullable: false})
    username: string;

    @Column({name: "password", length: 255, nullable: false})
    password: string;

    @CreateDateColumn({name: "created_at"})
    created_at?: string;
}