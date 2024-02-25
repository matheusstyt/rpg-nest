import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { UsuarioService } from './usuarios.service';

@WebSocketGateway(3002, { cors: "*"})
export class UsuariosGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    
    constructor ( private usuarioServices: UsuarioService ) {}

    @WebSocketServer()
    server: any;

    @SubscribeMessage('userConnect')
    async handleEventConnect(@MessageBody() userId: string) {
        await this.usuarioServices.update(userId, { is_online: true});
        console.log("usuario conectado", userId)
        this.server.emit('userConnect', userId);
    }

    @SubscribeMessage('userDisconnect')
    async handleEventDisconnect(@MessageBody() userId: string) {
        await this.usuarioServices.update(userId, { is_online: false});
        console.log("usuario desconectado", userId)
        this.server.emit('userDisconnect', userId);
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
