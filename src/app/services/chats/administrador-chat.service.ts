import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorChatService {


  private chatListSubject = new BehaviorSubject<any[]>([]);
  $chatList = this.chatListSubject.asObservable();

  private roomsListSubject = new BehaviorSubject<any[]>([]);
  $userList = this.roomsListSubject.asObservable();

  constructor(private socket: SocketService)  {
    this.socket.io.on('actualizarChat', (data) => {
      this.chatListSubject.next(data);
    });

    this.socket.io.on('actualizarRooms', (data) => {
      this.roomsListSubject.next(data);
    });
  }

  public verChat(room: string): void {
    this.socket.io.emit('verChat', { room });
  }

  public sendMessageAsesor(data: { message: string, room: string }): void {
    this.socket.io.emit('sendMessageAsesor', data);
  }

  public loadRooms(): void {
    this.socket.io.emit('loadRooms');
  }

  public disconnectAdmin(room: string): void {
    this.socket.io.emit('disconnectAdmin', { room });
  }
}
