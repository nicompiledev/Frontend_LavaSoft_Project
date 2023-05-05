import { Component } from '@angular/core';
import { anonimoService } from 'src/app/services/anonimo.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {

  activeModal: number = 0;

  lavaderos: any = {};
  loading: boolean = true;

  constructor(private anonimoService: anonimoService , private modal_service:ModalReserveService) {}

  ngOnInit(): void {
    this.modal_service.$modal.subscribe(valor => {
      this.activeModal = valor
    })

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.anonimoService.getLavaderos().subscribe((res) => {
      console.log(res)
      this.lavaderos = res
      this.loading = false;
    })
  }

}
