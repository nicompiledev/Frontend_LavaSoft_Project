import { Component } from '@angular/core';
import { InputService } from 'src/app/services/comunicación/input.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {

  descripcion: string;
  siNoLoRecogen: string;

  constructor(private profile: InputService) {

    this.profile.$informacionBasica.subscribe((res: any) => {
      this.descripcion = res.descripcion;
      this.siNoLoRecogen = res.siNoLoRecogen;
    })
  }

}
