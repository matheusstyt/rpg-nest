import { Module } from '@nestjs/common';
import { ConviteSalaService } from './conviteSala.service';
import { ConviteSalaController } from './conviteSala.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConviteSalaEntity } from './conviteSala.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ConviteSalaEntity]) ],
    controllers: [ ConviteSalaController],
    providers: [ ConviteSalaService ],
})
export class ConviteSalaModule {}
