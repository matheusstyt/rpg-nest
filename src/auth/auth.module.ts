import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuarios/usuarios.service';
import { UsuarioEntity } from 'src/usuarios/usuarios.entity';
import { UsuarioModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: "86400s"
      }
    }),
    TypeOrmModule.forFeature([UsuarioEntity]),

  ],
  providers: [
    AuthService,
    UsuarioService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
})
export class AuthModule {}
