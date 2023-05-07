import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/comunicación/input.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements OnInit {

  images: any[] = [];

  iterations: number = 0;
  
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
      this.images = ['https://seguroserenus.com.co/wp-content/uploads/2022/09/imagen-seguro-carro1-serenus.jpg', 'https://elestimulo.com/wp-content/uploads/2015/07/carro1.jpg', 'https://d2yoo3qu6vrk5d.cloudfront.net/images/20211220091840/carro1.jpg']
      this.iterations = this.images.length - 2;
    });

  }
}

