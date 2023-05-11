import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io = io('http://localhost:4000',{
    withCredentials: true,
    autoConnect: true,
    transportOptions: {
      polling: {
        extraHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    }
  });

  constructor() {
  }
}
