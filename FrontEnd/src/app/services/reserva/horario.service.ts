import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {

  private horasDSubject: Subject<string[]> = new Subject<string[]>();
  horasD$: Observable<string[]> = this.horasDSubject.asObservable();

  constructor(private socket: SocketService) {
    this.socket.io.on('horasLibres', (horas: string[]) => {
      console.log(horas)
      this.horasDSubject.next(horas);
    })
  }

  listarHorario(object: object){
    console.log(object)
    this.socket.io.emit('actualizarHorario', object);
  }

  reservar(datos: object){
    this.socket.io.emit('reservar', datos)
  }

}
