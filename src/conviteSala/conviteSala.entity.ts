import { SalasEntity } from "src/salas/salas.entity";
import { UsuarioEntity } from "src/usuarios/usuarios.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("convite_sala")
export class ConviteSalaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => SalasEntity, { eager: true }) // Muitas solicitações pertencem a um usuário remetente
    @JoinColumn({ name: 'sender_id' })
    sender?: SalasEntity;

    @ManyToOne(() => UsuarioEntity, { eager: true }) // Muitas solicitações são enviadas para um usuário destinatário
    @JoinColumn({ name: 'recipient_id' })
    recipient?: UsuarioEntity;

    @Column({name: "is_opened", type: "boolean", default: false})
    is_opened?: boolean;
    
    @CreateDateColumn()
    created_at?: Date;
}