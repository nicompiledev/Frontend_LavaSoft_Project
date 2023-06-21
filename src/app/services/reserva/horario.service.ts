import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
@Injectable({
  providedIn: 'root',
})
export class HorarioService {

  constructor(private socket: SocketService) {
  }

  listarHorario(object: object){
    this.socket.io.emit('horasDisponibles', object);
  }

  reservar(datos: object){
    this.socket.io.emit('reservar', datos)
  }

}
