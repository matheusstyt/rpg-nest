import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { ConviteParceriaService } from './conviteParceria.service';
import { Socket } from 'dgram';

@WebSocketGateway(3001, { cors: "*"})
export class ConviteParceriaGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    constructor ( private conviteParceriaService: ConviteParceriaService) {}
    @WebSocketServer()
    server: Socket;

    @SubscribeMessage('aceitarConvite')
    handleEvent(@MessageBody() data: string) {
        //this.conviteParceriaService.
    }
    handleConviteAceito(id: string){
        this.server.emit("conviteAceito", id);
    }
    handleConnection(client: any, ...args: any[]) {
        console.log('User connected');
    }

    handleDisconnect(client: any) {
        console.log('User disconnected');
    }

    afterInit(server: any) {
        console.log('Socket is live')
    }
}
