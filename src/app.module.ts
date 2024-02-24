import { SalasModule } from './salas/salas.module';

import { NotificacoesModule } from './notificacoes/notificacoes.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from 'config/postgres.config.services';
import { UsuarioModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SalasModule,
    NotificacoesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
      imports: []
    }),
    AuthModule,
    UsuarioModule,
  ],
})
export class AppModule { }
