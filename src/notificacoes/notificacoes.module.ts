import { Module } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesController } from './notificacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacaoParceriaEntity } from './notificacoes.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([NotificacaoParceriaEntity]) ],
    controllers: [ NotificacoesController],
    providers: [ NotificacoesService ],
})
export class NotificacoesModule {}
