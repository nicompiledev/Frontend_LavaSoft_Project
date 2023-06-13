import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public io: any;
  rol: string = '';

  constructor(private auth: AuthService) {
    this.auth.isLogin.subscribe((isLogin) => {
      if (isLogin) {

        this.auth.rol.subscribe(rol => this.rol = rol);

        this.io = io('http://localhost:4000', {
          withCredentials: true,
          autoConnect: true,
          transportOptions: {
            polling: {
              extraHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`,
              },
            },
          },
        });
      }
    });
  }
}
