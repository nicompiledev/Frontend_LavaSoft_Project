import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private imagenes = new BehaviorSubject<any[]>([]);
  $imagenes = this.imagenes.asObservable();

  constructor() { }

  getImagenes(imagenes: any[]){
    for (let i = 0; i < imagenes.length; i++) {
      imagenes[i] = {
        previewImageSrc: imagenes[i],
        thumbnailImageSrc: imagenes[i],
        alt: 'Description for Image ' + i,
        title: 'Title ' + i
      };
    }

    this.imagenes.next(imagenes);
  }
}
