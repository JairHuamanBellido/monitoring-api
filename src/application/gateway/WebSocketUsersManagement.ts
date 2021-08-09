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
  handleClientJoinRoom(client: Socket, userId: number): void {
    this.logger.log(`El usuario ${userId} se unió al room`);
    client.join(`${userId}`);
    this.server.to('admin-room').emit('notify-admin', client.id);
  }

  @SubscribeMessage('adminJoinRoom')
  handleAdminJoinRoom(client: Socket): void {
    this.logger.log('Un admin se unió al room');
    client.join('admin-room');
  }

  @SubscribeMessage('blockAccount')
  handleBlockAccount(client: Socket, userId: string): void {
    this.logger.log(`Bloqueando al usuario ${userId}`);
    this.server.to(userId).emit('block account');
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
