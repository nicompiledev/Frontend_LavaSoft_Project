import { Component } from '@angular/core';
import { anonimoService } from 'src/app/services/anonimo.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {

  lavaderos: any = {};
  loading: boolean = true;

  constructor(private anonimoService: anonimoService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.anonimoService.getLavaderos().subscribe((res) => {
      console.log(res)
      this.lavaderos = res
      this.loading = false;
    })
  }

}
