import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public io: any;

  constructor(private auth: AuthService) {
    this.io = io('http://localhost:4000', {
      withCredentials: true,
      autoConnect: true,
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': `Bearer ${this.auth.getToken()}`,
            'Rol': `${this.auth.getRol()}`
          }
        }
      }
    });
  }
}
