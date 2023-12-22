import { Injectable, Logger } from "@nestjs/common";
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageBody, SubscribeMessage } from "@nestjs/websockets";

import { Socket, Server} from "socket.io";

@Injectable()
@WebSocketGateway(80, {namespace: "eventos", cors: true})
export class EventosGateway implements OnGatewayInit {

    @WebSocketServer() wss: Server;

    private logger: Logger = new Logger("EventosGateway");7
    private connected: Map<string, Socket> = new Map();

    afterInit(server: any) {
        console.log(`wss on : ${server}`)
        this.logger.log("WebSocket iniciado!")
    }
    
    handleConnection(client: Socket){
        this.connected.set(client.id, client);
    }

    handleDisconnect(client: Socket){
        this.connected.delete(client.id);
    }

    sendMessageToAll( message: any) {
        this.wss.emit("eventosToBroadCast", message);
    }
}