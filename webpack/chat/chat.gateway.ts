import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

export interface IMessage {
    content: string;
    senderId: string;
    datetime: Date;
}

@WebSocketGateway(3001, {cors: "*"})
export  class ChatGateway {

    // cria instância do wss
    @WebSocketServer()
    server;

    @SubscribeMessage("message")
    hadleMessage(
        @MessageBody() message: IMessage,
        @ConnectedSocket() client: Socket

    ): void {
        const senderId = client.id;
        console.log(`message: `, message);
        this.server.emit("message", message, senderId);
    }
}