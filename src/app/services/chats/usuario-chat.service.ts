import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioChatService {

  private chatListSubject = new BehaviorSubject<any[]>([]);
  $chatList = this.chatListSubject.asObservable();

  constructor(private socket: SocketService)  {
    this.socket.io.on('actualizarChat', (data) => {
      this.chatListSubject.next(data);
    });
  }

  public sendMessage(message: string, token: string): void {
    console.log('usuario', token);
    console.log('mensaje', message);

    let data = {
      message: message,
      token: token
    }
    this.socket.io.emit('sendMessage', data);
  }

  public disconnectUser(room: string, tipo: string): void {
    console.log('usuario', tipo);
    this.socket.io.emit('disconnectUser', { room, tipo });
  }
}
