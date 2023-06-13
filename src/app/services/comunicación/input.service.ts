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

  // Componente Reserva
  private informacion = new BehaviorSubject<any>('');
  $informacion = this.informacion.asObservable();

  // Compoente Informacion
  private informacionBasica = new BehaviorSubject<any>('');
  $informacionBasica = this.informacionBasica.asObservable();

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

  setInformacion(nombreLavadero: string, ciudad: string, direccion: string, hora_apertura: string, hora_cierre: string, tipoVehiculos: string){
      this.informacion.next({nombreLavadero, ciudad, direccion, hora_apertura, hora_cierre, tipoVehiculos})
  }

  setInformacionBasica(descripcion: string, siNoLoRecogen: string){
    this.informacionBasica.next({descripcion, siNoLoRecogen})
  }
}
