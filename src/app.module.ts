import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from 'config/postgres.config.services';
import { UsuarioModule } from './usuarios/usuarios.module';
import { ChatGateway } from 'webpack/chat/chat.gateway';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
      imports: []
    }),
    AuthModule,
    UsuarioModule,
    ChatGateway
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
