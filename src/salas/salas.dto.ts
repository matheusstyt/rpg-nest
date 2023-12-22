export interface User{
    userId: string;
    socketId: string;
    username: string;
}
export interface Room {
    name: string;
    host: User;
    users: User[]
}
export interface Message {
    user: User;
    timeSent: string;
    messsage: string;
    roomname: string;
}

export interface ServerToClientEvents {
    chat: (e: Message) => void
}
  
export interface ClientToServerEvents {
    chat: (e: Message) => void
    join_room: (e: { user: User; roomName: string }) => void
}