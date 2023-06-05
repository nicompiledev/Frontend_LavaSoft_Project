import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-carwash',
  templateUrl: './preview-carwash.component.html',
  styleUrls: ['./preview-carwash.component.scss']
})
export class PreviewCarwashComponent {

  @Input() lavadero: any;

  stringify(data: any): string {
    console.log(data);
    
    return JSON.stringify(data);
  }

  constructor() { 

  // despues de unos segundos mostrar lavadero
  setTimeout(() => {
    console.log(this.lavadero);
  }, 2000);
    
}

}
