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
  private servicioID = new BehaviorSubject<string>('');
  $servicioID = this.servicioID.asObservable();

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

  setServicioID(servicio: any){
    this.servicioID.next(servicio);
  }
}
