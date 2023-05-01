import { Component } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent {

  imagenes: any[];
  images?: FileList;
  selectedImage?: File;

  constructor(private imagenesService: ImagenesService) {
    this.imagenes = [];
    this.obtenerImagenes();
  }

  ImagenesSeleccionadas(event: any) {
    this.images = event.target.files;
  }

  ImagenSeleccionada(event: any) {
    this.selectedImage = event.target.files[0];
  }

  enviarMuchasImagenes() {
    if (!this.images || this.images.length === 0) {
      alert('No se seleccionaron imágenes');
      return;
    }
    this.imagenesService
      .SubirMuchasImagenes(this.images)
      .subscribe((response: any) => {
        this.obtenerImagenes();
      });
  }

  enviarUnaImagen  () {
    if (!this.selectedImage) {
      alert('No se seleccionó una imagen');
      return;
    }
    alert('Imagen subida con éxito')

    this.imagenesService
      .SubirUnaImagen(this.selectedImage).subscribe((res: any) => {
        console.log(res);
      });

    this.obtenerImagenes();
  }

  obtenerImagenes() {
    this.imagenesService.obtenerImagenes().subscribe(
      (response: any) => {
        console.log(response)
        this.imagenes = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
