import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent {

  marginleft: string;
  animationPaused: boolean = false;
  mover(tamaño: string) {
    this.marginleft = tamaño;
    this.animationPaused = true ;
    setTimeout(() => {
      this.animationPaused = false

    } ,5000)

  }
}

