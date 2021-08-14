import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'users-management' })
export class WebSocketUsersManagement implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('clientJoinRoom')
  handleClientJoinRoom(client: Socket, payload: string): void {
    this.logger.log(`El usuario ${payload} se unió al room`);
    client.join(`${payload}`);
    client.join('users-room');
    this.server.to('admin-room').emit('handleUserLogged', { id: payload, isLogged: true, socketId: client.id });
  }

  @SubscribeMessage('adminJoinRoom')
  handleAdminJoinRoom(client: Socket): void {
    this.logger.log('Un admin se unió al room');
    client.join('admin-room');
  }

  @SubscribeMessage('requestClientConnections')
  requestClientConnection(client: Socket): void {
    this.server.to('users-room').emit('reportStatusConnection');
  }

  @SubscribeMessage('handleUserConnection')
  handleUserConnection(client: Socket, payload: number): void {
    this.logger.log(`Reciiendo notifaciones del usuario conectado  [${payload}]`);
    this.server.to('admin-room').emit('handleUserLogged', { id: payload, isLogged: true, socketId: client.id });
  }

  @SubscribeMessage('blockAccount')
  handleBlockAccount(client: Socket, userId: string): void {
    this.logger.log(`Bloqueando al usuario ${userId}`);
    this.server.to(userId).emit('blockAccount');
  }

  @SubscribeMessage('logoutClient')
  disconnectClientConnection(client: Socket, payload: number): void {
    this.logger.log(`Se desconecto ${payload}`);
    this.server.to('admin-room').emit('handleUserLogged', { id: payload, isLogged: false, socketId: client.id });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server.to('admin-room').emit('handleUserLogged', { socketId: client.id, isLogged: false });
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
