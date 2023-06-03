import { Component } from '@angular/core';
import { InputService } from 'src/app/services/comunicación/input.service';

@Component({
  selector: 'app-data-carwash',
  templateUrl: './data-carwash.component.html',
  styleUrls: ['./data-carwash.component.scss']
})
export class DataCarwashComponent {

  nombreLavadero: string;
  ciudad: string;
  direccion: string;
  hora_apertura: string;
  hora_cierre: string;
  tipoVehiculos: string[] = []

  constructor(private input: InputService) {
    this.input.$informacion.subscribe((res: any) => {
      this.nombreLavadero = res.nombreLavadero;
      this.ciudad = res.ciudad;
      this.direccion = res.direccion;
      this.hora_apertura = res.hora_apertura;
      this.hora_cierre = res.hora_cierre;
      this.tipoVehiculos = res.tipoVehiculos;
    });
  }


}
