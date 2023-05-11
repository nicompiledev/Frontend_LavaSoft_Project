import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  // Componente Carousel
  private imagenes = new BehaviorSubject<any[]>([]);
  $imagenes = this.imagenes.asObservable();

  // Componente Servicios
  private servicios = new BehaviorSubject<any[]>([]);
  $servicios = this.servicios.asObservable();

  // Componente Reserva
  private servioID = new BehaviorSubject<string>('');
  $servioID = this.servioID.asObservable();

  constructor() { }

  setImagenes(imagenes: any[]){
    for (let i = 0; i < imagenes.length; i++) {
      imagenes[i] = {
        ImageSrc: imagenes[i],
        alt: 'Description for Image ' + i
      };
    }
    this.imagenes.next(imagenes);
  }

  setServicios(servicios: any[]){
    this.servicios.next(servicios);
  }

  setServicioID(id: string){
    this.servioID.next(id);
  }
}
