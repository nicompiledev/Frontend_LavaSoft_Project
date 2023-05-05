import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/comunicación/input.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements OnInit {

  images: any[] = [];
  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  constructor(private input: InputService) {}

  ngOnInit(): void {

    this.input.$imagenes.subscribe((imagenes) => {
      this.images = imagenes;
    });

  }
}

